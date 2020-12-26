import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { selectTab } from './tabActions';
import If from '../operator/If';

class TabHeader extends Component {
  render() {
    const selected = this.props.tab.selected === this.props.target;
    const visible = this.props.tab.visible[this.props.target];
    return (
      <If test={visible}>
        <li className={selected ? 'active' : ''}>
          <a
            href='javascript:;'
            data-toggle='tab'
            data-target={this.props.target}
            onClick={() => this.props.selectTab(this.props.target)}
          >
            <i className={`fa fa-${this.props.icon}`}></i> {this.props.label}
          </a>
        </li>
      </If>
    );
  }
}

const mapStateToProps = state => ({ tab: state.tab });
const mapDispatchToProps = dispatch =>
  bindActionCreators({ selectTab }, dispatch); // Dispatch: chama action creator cuja função é uma action e o resultado é passado para o reducer para que seja atualizado o estado do componente
export default connect(mapStateToProps, mapDispatchToProps)(TabHeader);
