import './Principal.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

// imagens
import Logo from '../../imgs/Logo.png';
import imgPerfil from '../../imgs/imgPerfil.png';
import deslogar from '../../imgs/deslogar.png';

// componentes
import Colunas from '../../components/colunas/Colunas';
import Resumo from '../../components/Resumo/Resumo';
import Transacoes from '../../components/transacoes/Transacoes';
import AdicionarRegistro from '../../components/AdicionarRegistro/AdicionarRegistro';
import Modal from '../../components/Modal/Modal';


export default function Principal() {
    const [openModal, setOpenModal] = useState(false);
    const [listaTransacoes, setListaTransacoes] = useState([]);
    const [attEffect, setAttEffect] = useState(false);
    const [nomeUsuario, setNomeUsuario] = useState('');
    const [titleModal, setTitleModal] = useState('');
    const [idTransacao, setIdTransacao] = useState(null);

    useEffect(() => {
        async function receberTransacoes() {
            try {
                const response = await api.get(`/transacoes/${localStorage.getItem('idUsuario')}`);

                setListaTransacoes(response.data.listaTransacoes);
                setNomeUsuario(response.data.nomeUsuario)
            } catch (error) {
                console.log(error);
            }
        }

        receberTransacoes();
    }, [attEffect]);

    function atualizarEffect() {
        setAttEffect(!attEffect)
    }

    const navigate = useNavigate()

    function logoff() {

        localStorage.clear()
        navigate('/login')

    }


    return (
        <div className='container-principal'>
            <div className='header-principal'>
                <img className='logo' src={Logo} alt="logomarca do site" />
                <div className='perfil-principal'>
                    <img src={imgPerfil} alt="" />
                    <span>{nomeUsuario}</span>
                    <a onClick={() => logoff()}>
                        <img src={deslogar} alt="" />
                    </a>
                </div>
            </div>
            <div className='body-principal'>
                <div>
                    <Colunas />
                    <Transacoes
                        atualizarEffect={atualizarEffect}
                        listaTransacoes={listaTransacoes}
                        setOpenModal={setOpenModal}
                        setTitleModal={setTitleModal}
                        setIdTransacao={setIdTransacao}
                    />
                </div>
                <div>
                    <Resumo
                        attEffect={attEffect}
                    />
                    <AdicionarRegistro
                        setOpenModal={setOpenModal}
                        setTitleModal={setTitleModal}
                    />
                </div>
            </div>
            <Modal
                atualizarEffect={atualizarEffect}
                openModal={openModal}
                setOpenModal={setOpenModal}
                titleModal={titleModal}
                listaTransacoes={listaTransacoes}
                setIdTransacao={setIdTransacao}
                idTransacao={idTransacao}
            />
        </div >
    )
}