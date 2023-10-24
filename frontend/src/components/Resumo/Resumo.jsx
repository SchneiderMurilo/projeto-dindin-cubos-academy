import { useState, useEffect } from 'react';
import api from '../../services/api';
import './Resumo.css'

export default function Resumo({ attEffect }) {

    const [transacoes, setTransacoes] = useState([]);

    useEffect(() => {
        async function receberTransacoes() {
            try {
                const response = await api.get(`/transacoes/${localStorage.getItem('idUsuario')}`);
                setTransacoes(response.data.listaTransacoes);
            } catch (error) {
                console.log(error);
            }
        }

        receberTransacoes();
    }, [attEffect]);


    function formatarValor(num) {
        const valorReal = num / 100

        const valorFormatado = valorReal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

        return (valorFormatado)
    }

    function entradasValor() {
        let valorTotal = 0;

        transacoes.map((obj) => {
            if (obj.tipo === 'entrada') {
                valorTotal += obj.valor
            }
        })

        return (formatarValor(valorTotal))
    }

    function saidasValor() {
        let valorTotal = 0;

        transacoes.map((obj) => {
            if (obj.tipo === 'saida') {
                valorTotal += obj.valor
            }
        })

        return (formatarValor(valorTotal))
    }

    function saldoValor() {
        let valorTotal = 0;

        transacoes.map((obj) => {
            if (obj.tipo === 'saida') {
                valorTotal -= obj.valor
            } else if (obj.tipo === 'entrada') {
                valorTotal += obj.valor
            }
        })

        return (formatarValor(valorTotal))
    }

    return (
        <div className='conteudo-lado-direito'>
            <div className='conteudo-resumo'>
                <div className='conteudo-resumo-valores'>
                    <h3 className='conteudo-resumo-titulo'>Resumo</h3>
                    <div className='conteudo-texto'>
                        <h4>Entradas </h4>
                        <span className='conteudo-resumo-entrada'>{entradasValor()}</span>
                    </div>
                    <div className='conteudo-texto'>
                        <h4>Saidas </h4>
                        <span className='conteudo-resumo-saida'>{saidasValor()}</span>
                    </div>
                    <div className='conteudo-texto-saldo'>
                        <h4>Saldo </h4>
                        <span className='conteudo-resumo-saldo'>{saldoValor()}</span>
                    </div>
                </div>
            </div>
        </div>
    )

}