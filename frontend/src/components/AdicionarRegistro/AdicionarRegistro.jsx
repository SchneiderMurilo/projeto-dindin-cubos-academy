import './AdicionarRegistro.css'

export default function AdicionarRegistro({ setOpenModal, setTitleModal }) {

    function abrirModal() {
        setOpenModal(true);
        setTitleModal('Adicionar registro');
    }

    return (
        <div>
            <button
                className='button-adicionar-registro'
                onClick={() => abrirModal()}
            >Adicionar Registro
            </button>
        </div>
    )
}