import React, { Component } from "react";
import { Modal, Form, Button } from "semantic-ui-react";
import api from '../../../../service/api'
import { success, error } from '../../../../utils/toast'
export default class ModalCart extends Component {
  state = {
    total: "",
    type_payment: "",
    status: "",
    errors: {}
  };

  render() {

    return (
      <Modal
        onClose={() => {this.props.callback(false)}}
        onOpen={() => this.setState({deleteModal: true})}
        open={this.props.show}
      >
        <Modal.Header>Carrinho de compras</Modal.Header>
        <Modal.Content >
        
        </Modal.Content>
        <Modal.Actions>
          <Button color='red' basic onClick={() => {this.props.callback(false)}}>
            Cancelar
          </Button>
          <Button
            content="Finalizar compra"
            labelPosition='right'
            icon='checkmark'
            onClick={() => {}}
            positive
          />
        </Modal.Actions>
      </Modal>
    );
  }
}
