import './Transacoes.css'
import DeletarTransacao from '../DeletarTransacao/DeleteTransacao'
import { useState } from 'react'

import lixo from '../../imgs/lixo.png'
import lapis from '../../imgs/lapis.png'

export default function Transacoes({ listaTransacoes, atualizarEffect, setOpenModal, setTitleModal, setIdTransacao }) {
    const [idDelete, setIdDelete] = useState(null)

    function formatarValor(num) {
        const valorReal = num / 100

        const valorFormatado = valorReal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

        return (valorFormatado)
    }

    function abrirModalEditar(id) {
        setOpenModal(true);
        setTitleModal('Editar registro');
        setIdTransacao(id);
    }

    function setarEstilo(e) {
        setIdDelete(e)
    }

    return (
        <div className='rolar-transacoes'>
            {listaTransacoes.length > 0 ?
                listaTransacoes.map((obj) => (
                    <>
                        < div className='conteudo-lista' >
                            <h3>{obj.data}</h3>
                            <h3>{obj.diaSemana}</h3>
                            <h3>{obj.descricao}</h3>
                            <h3>{obj.categoria}</h3>
                            <h3 style={obj.tipo === 'saida' ? { color: '#FA8C10' } : { color: '#645FFB' }}>
                                {formatarValor(obj.valor)}
                            </h3>
                            <div className='botoes-lista'>
                                <img
                                    src={lapis}
                                    alt="editar transacao"
                                    onClick={() => abrirModalEditar(obj.id)}
                                />
                                <img
                                    value={obj.id}
                                    onClick={() => setarEstilo(obj.id)}
                                    src={lixo}
                                    alt="deletar transacao"
                                />

                                <DeletarTransacao
                                    atualizarEffect={atualizarEffect}
                                    objID={obj.id}
                                    idDelete={idDelete}
                                    setIdDelete={setIdDelete}
                                />
                            </div>
                        </div>
                    </>
                ))

                : <div className='conteudo-lista sem-transacao'>Aqui é a sua lista de transações, adicione uma!</div>}
        </div >
    )
}