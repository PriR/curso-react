import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { init } from './billingCyclesActions';

import { reduxForm, Field, formValueSelector } from 'redux-form';

import LabelAndInput from '../common/form/labelAndInput';
import ItemList from './itemList';
import Summary from './summary';
class BillingCycleForm extends Component {

  calculateSummary() {
    const sum = (t, v) => t + v;
    // reduce = pega array com vários elementos e reduz a um elemento
    console.log(this.props.credits);
    console.log(this.props.debts);
    return {
      sumOfCredits: this.props.credits.map(c => +c.value || 0).reduce(sum, 0), // caso NaN retorna 0
      sumOfDebts: this.props.debts.map(d => +d.value || 0).reduce(sum, 0) 
    }
  }

  render() {
    const { handleSubmit, readOnly, credits, debts } = this.props; // handleSubmit disponível pq classe foi decorada com reduxForm
    const { sumOfCredits, sumOfDebts } = this.calculateSummary();
    return (
      <form role='form' onSubmit={handleSubmit}>
        <div className='box-body'>
          <Field
            name='name'
            component={LabelAndInput}
            readOnly={readOnly}
            label='Nome'
            cols='12 4'
            placeholder='Informe o nome'
          />
          <Field
            name='month'
            component={LabelAndInput}
            type='number'
            readOnly={readOnly}
            label='Mês'
            cols='12 4'
            placeholder='Informe o mês'
          />
          <Field
            name='year'
            component={LabelAndInput}
            type='number'
            readOnly={readOnly}
            label='Ano'
            cols='12 4'
            placeholder='Informe o ano'
          />
          <Summary credit={sumOfCredits} debt={sumOfDebts} />
          <ItemList
            cols='12 6'
            list={credits}
            readOnly={readOnly}
            field='credits'
            legend='Créditos'
          />
          <ItemList
            cols='12 6'
            list={debts}
            readOnly={readOnly}
            field='debts'
            legend='Débitos'
            showStatus={true}
          />
        </div>
        <div className='box-footer'>
          <button type='submit' className={`btn btn-${this.props.submitClass}`}>
            {this.props.submitLabel}
          </button>
          <button
            type='button'
            className='btn btn-default'
            onClick={this.props.init}
          >
            Cancelar
          </button>
        </div>
      </form>
    );
  }
}

// destroyOnUnmount: false = para formulario dinamico, reutilizacao do mesmo formulario com msm id. Mantem os dados no alterar quando botao de alterar clicado
BillingCycleForm = reduxForm({
  form: 'billingCycleForm',
  destroyOnUnmount: false,
})(BillingCycleForm);

const selector = formValueSelector('billingCycleForm');
const mapStateToProps = state => ({
  credits: selector(state, 'credits'),
  debts: selector(state, 'debts'),
});

const mapDispatchToProps = dispatch => bindActionCreators({ init }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BillingCycleForm);