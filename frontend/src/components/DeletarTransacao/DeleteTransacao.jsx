import './DeletarTransacao.css'
import api from '../../services/api'

export default function DeletarTransacao({ idDelete, setIdDelete, objID, atualizarEffect }) {

    async function deletarTransacao() {
        try {
            await api.delete(`/transacao/${objID}/usuario/${localStorage.getItem('idUsuario')}`)

        } catch (error) {
            console.log(error);
            return
        }

        atualizarEffect()
        setIdDelete(false)
    }

    return (
        <div
            style={{ display: idDelete === objID ? 'flex' : 'none' }}
            className='conteudo-popup hidden-popup'>
            <div className='quadrado-popup'>
            </div>
            <div className='retangulo-popup rotate-quadrado'>
                <div>
                    <h2>Apagar item?</h2>
                </div>
                <div className='buttons-popup'>
                    <button
                        className='button-popup-sim'
                        onClick={() => deletarTransacao()}
                    >Sim</button>
                    <button
                        className='button-popup-nao'
                        onClick={() => setIdDelete(false)}
                    >Não</button>
                </div>
            </div>
        </div>
    )
}