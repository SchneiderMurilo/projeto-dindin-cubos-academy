import './Cadastro.css';
import logo from '../../imgs/Logo.png';
import api from '../../services/api';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'


export default function Cadastro() {
    const navigate = useNavigate();

    const [usuario, setUsuario] = useState({
        nome: '',
        email: '',
        senha: '',
        confirmacaoSenha: ''
    })

    const [erroCadastro, setErroCadastro] = useState('')

    async function validarEnviar() {
        if (!usuario.nome) {
            setErroCadastro('O nome é obrigatório');
            return
        }

        const validadorEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!validadorEmail.test(usuario.email)) {
            setErroCadastro('Insira um e-mail válido');
            return
        }

        if (usuario.senha !== usuario.confirmacaoSenha) {
            setErroCadastro('As senhas nao coincidem');
            return
        }

        if (usuario.senha.length < 8) {
            setErroCadastro('A senha deve ter no mínimo 8 caracteres');
            return
        }

        try {
            await api.post('/cadastro', {
                nome: usuario.nome,
                email: usuario.email,
                senha: usuario.senha
            })
        } catch (error) {
            setErroCadastro("E-mail já cadastrado.");

            return;
        }

        return navigate('/login')

    }


    return (
        <div className='background-image-cadastro'>
            <div>
                <img className='logo' src={logo} alt="logomarca do site" />
            </div>
            <div className='container-cadastro-page'>
                <div className='cadastro-container'>
                    <h2>Cadastre-se</h2>
                    <div className='input-cadastro-container'>
                        <label htmlFor="nome">Nome</label>
                        <input
                            name='nome'
                            type="text"
                            onChange={(e) => setUsuario({ ...usuario, nome: e.target.value })}
                        />
                    </div>
                    <div className='input-cadastro-container'>
                        <label htmlFor="email">E-mail</label>
                        <input
                            name='email'
                            type="text"
                            onChange={(e) => setUsuario({ ...usuario, email: e.target.value })}
                        />
                    </div>
                    <div className='input-cadastro-container'>
                        <label htmlFor="password">Senha</label>
                        <input
                            name='password'
                            type="password"
                            onChange={(e) => setUsuario({ ...usuario, senha: e.target.value })}
                        />
                    </div>
                    <div className='input-cadastro-container'>
                        <label htmlFor="senhaConfirmacao">Confirmação de senha</label>
                        <input
                            name='senhaConfirmacao'
                            type="password"
                            onChange={(e) => setUsuario({ ...usuario, confirmacaoSenha: e.target.value })}
                        />
                    </div>
                    <button
                        onClick={validarEnviar}
                    >Cadastrar</button>
                    <h5>Já tem cadastro? <a onClick={() => navigate('/login')} href="">Clique aqui!</a></h5>
                    <span className='erro-cadastro' style={{ color: 'red' }}>{erroCadastro}</span>
                </div>
            </div>
        </div >
    )
}