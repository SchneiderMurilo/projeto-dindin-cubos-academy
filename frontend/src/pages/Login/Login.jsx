import './Login.css'
import logo from '../../imgs/Logo.png'
import api from '../../services/api';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


export default function Login() {

    const navigate = useNavigate();

    const [usuarioLogin, setUsuarioLogin] = useState({
        email: '',
        senha: ''
    })

    const [erroLogin, setErroLogin] = useState('')

    function attEmail(e) {
        setUsuarioLogin({ ...usuarioLogin, email: e })
    }

    function attSenha(e) {
        setUsuarioLogin({ ...usuarioLogin, senha: e })
    }

    async function validarLogin() {

        try {
            const response = await api.post('/login', {
                usuarioLogin
            })


            localStorage.setItem('token', `${response.data.token}`)
            localStorage.setItem('idUsuario', `${response.data.id}`)

        } catch (error) {
            setErroLogin('E-mail e/ou senha incorretos.');
            return;
        }

        navigate('/')
    }



    return (
        <div className='background-image-login'>
            <div>
                <img className='logo' src={logo} alt="logomarca do site" />
            </div>
            <div className='container-login-page'>
                <div className='text-container'>
                    <h1>Controle suas <span>finanças</span>, <br />
                        sem planilha chata.
                    </h1>
                    <h3>
                        Organizar as suas finanças nunca foi tão fácil, <br />
                        com o DINDIN, você tem tudo num único lugar <br />
                        e em um clique de distância.
                    </h3>
                    <button onClick={() => navigate('/cadastro')}>Cadastre-se</button>
                </div>
                <div className='login-container'>
                    <h2>Login</h2>
                    <div className='input-login-container'>
                        <label htmlFor="email">E-mail</label>
                        <input
                            name='email'
                            type="text"
                            onChange={(e) => attEmail(e.target.value)}
                        />
                    </div>
                    <div className='input-login-container'>
                        <label htmlFor="password">Senha</label>
                        <input
                            name='password'
                            type="password"
                            onChange={(e) => attSenha(e.target.value)}
                        />
                    </div>
                    <span className='erro-login'>{erroLogin}</span>
                    <button onClick={validarLogin}>Entrar</button>
                </div>
            </div>
        </div>
    )
}