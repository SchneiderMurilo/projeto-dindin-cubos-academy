import './Modal.css'
import fechar from '../../imgs/fechar.png';
import api from '../../services/api';
import { useEffect, useState } from 'react'

export default function Modal({ openModal, setOpenModal, atualizarEffect, titleModal, listaTransacoes, idTransacao }) {
    const [mensagemErro, setMensagemErro] = useState('')
    const [categorias, setCategorias] = useState([
        'Alimentação',
        'Assinaturas e Serviços',
        'Casa',
        'Compras',
        'Cuidados pessoais',
        'Educaçäo',
        'Outros...'
    ])
    const [registro, setRegistro] = useState({
        id: '',
        data: '',
        dataJS: '',
        diaSemana: '',
        descricao: '',
        categoria: 'Alimentação',
        valor: 0,
        tipo: 'saida'
    })

    useEffect(() => {
        setMensagemErro('');

        if (titleModal === 'Adicionar registro') {
            setRegistro({
                id: '',
                data: '',
                dataJS: '',
                diaSemana: '',
                descricao: '',
                categoria: 'Alimentação',
                valor: '',
                tipo: 'saida'
            })
        }

        if (titleModal === 'Editar registro') {
            const transacao = listaTransacoes.find((e) => e.id === idTransacao);
            setRegistro({
                id: transacao.id,
                data: transacao.data,
                dataJS: transacao.dataJS,
                diaSemana: transacao.diaSemana,
                descricao: transacao.descricao,
                categoria: transacao.categoria,
                valor: transacao.valor,
                tipo: transacao.tipo
            })
        }
    }, [openModal])

    function clicarEntradaSaida(e) {
        const novoRegistro = { ...registro, tipo: e };
        setRegistro(novoRegistro);
    }

    function attValor(e) {
        if (e < 0) {
            return
        }

        const novoRegistro = { ...registro, valor: e * 100 };
        setRegistro(novoRegistro);
    }

    function attCategoria(e) {
        const novoRegistro = { ...registro, categoria: e };
        setRegistro(novoRegistro);
    }

    function attData(e) {
        const dataJS = new Date(e);
        const diaSemana = dataJS.getDay();
        let diaSemanaTexto = '';

        if (diaSemana === 6) {
            diaSemanaTexto = 'Domingo'
        } else if (diaSemana === 0) {
            diaSemanaTexto = 'Segunda'
        } else if (diaSemana === 1) {
            diaSemanaTexto = 'Terça'
        } else if (diaSemana === 2) {
            diaSemanaTexto = 'Quarta'
        } else if (diaSemana === 3) {
            diaSemanaTexto = 'Quinta'
        } else if (diaSemana === 4) {
            diaSemanaTexto = 'Sexta'
        } else if (diaSemana === 5) {
            diaSemanaTexto = 'Sábado'
        }

        const partesData = e.split('-');

        const ano = partesData[0];
        const mes = partesData[1];
        const dia = partesData[2];

        const dataFormatada = `${dia}/${mes}/${ano}`;

        const novoRegistro = { ...registro, data: dataFormatada, diaSemana: diaSemanaTexto, dataJS: e };

        setRegistro(novoRegistro);
    }

    function attDescricao(e) {

        if (e.length < 19) {
            const novoRegistro = { ...registro, descricao: e };
            setRegistro(novoRegistro);
        }
    }



    async function addTransacao() {

        function isOK() {
            atualizarEffect()
            setOpenModal(false)
            setRegistro({
                id: '',
                data: '',
                dataJS: '',
                diaSemana: '',
                descricao: '',
                categoria: 'Alimentação',
                valor: '',
                tipo: 'saida'
            })
        }

        if (titleModal === 'Adicionar registro') {
            if (registro.data === '' || registro.descricao === '' ||
                registro.valor === '') {
                setMensagemErro('Preencha todos os campos!')
            } else {
                try {
                    await api.post('/addtransacao', {
                        idUsuario: Number(localStorage.getItem('idUsuario')),
                        data: registro.data,
                        dataJS: registro.dataJS,
                        diaSemana: registro.diaSemana,
                        descricao: registro.descricao,
                        categoria: registro.categoria,
                        valor: registro.valor,
                        tipo: registro.tipo
                    })
                } catch (error) {

                }
                isOK()
            }
        } else if (titleModal === 'Editar registro') {
            try {
                await api.post('/edittransacao', {
                    idUsuario: Number(localStorage.getItem('idUsuario')),
                    id: registro.id,
                    data: registro.data,
                    dataJS: registro.dataJS,
                    diaSemana: registro.diaSemana,
                    descricao: registro.descricao,
                    categoria: registro.categoria,
                    valor: registro.valor,
                    tipo: registro.tipo
                })
            } catch (error) {

            }
            isOK()
        }

    }


    return (
        <div
            className='modal-background'
            style={{ display: openModal ? 'flex' : 'none' }}>
            <div>
                <div className='modal-conteudo'>
                    <div className='header-modal'>
                        <h1>{titleModal}</h1>
                        <a
                            onClick={() => setOpenModal(false)}
                        >
                            <img
                                src={fechar}
                                alt="fechar"
                            />
                        </a>
                    </div>

                    <div className='buttons-modal'>
                        <button
                            style={registro.tipo === 'entrada' ? { backgroundColor: '#3A9FF1' } : { backgroundColor: '' }}
                            value='entrada'
                            onClick={(e) => clicarEntradaSaida(e.target.value)}
                            className='button-modal-entrada'
                        >Entrada</button>
                        <button
                            style={registro.tipo === 'saida' ? { backgroundColor: '#FF576B' } : { backgroundColor: '' }}
                            value='saida'
                            onClick={(e) => clicarEntradaSaida(e.target.value)}
                            className='button-modal-saida'
                        >Saida</button>
                    </div>

                    <div className='modal-label'>
                        <label htmlFor="valor">Valor</label>
                        <input
                            name='valor'
                            type='number'
                            step='0.1'
                            onChange={(e) => attValor(e.target.value)}
                            value={`${(registro.valor / 100)}`}
                        />
                    </div>

                    <div className='modal-label'>
                        <label htmlFor="select">Categoria</label>
                        <select
                            name='select'
                            placeholder=''
                            onChange={(e) => attCategoria(e.target.value)}
                        >
                            {categorias.map((item) => (
                                <option key={item.length}>{item}</option>
                            ))}
                        </select>
                    </div>

                    <div className='modal-label'>
                        <label htmlFor="data">Data</label>
                        <input
                            name='data'
                            type="date"
                            onChange={(e) => attData(e.target.value)}
                            value={registro.dataJS}
                        />
                    </div>

                    <div className='modal-label'>
                        <label htmlFor="descricao">Descrição</label>
                        <input
                            name='descricao'
                            type="text"
                            value={registro.descricao}
                            onChange={(e) => attDescricao(e.target.value)}
                        />
                    </div>
                    <div className='modal-mensagem-erro'>
                        {mensagemErro}
                    </div>
                    <button
                        className='modal-button-confirmar'
                        onClick={() => addTransacao()}
                    >Confirmar</button>
                </div>
            </div>
        </div >

    )
}