import React, { Component } from "react";
import { Modal, Form, Button } from "semantic-ui-react";
import api from '../../../../service/api'
import { success, error } from '../../../../utils/toast'
export default class ModalAdd extends Component {
  state = {
    name: "",
    code: "",
    price: "",
    description: "",
    errors: {}
  };

  onAdd = async () => {
    const { name, code, price, description } = this.state;
    const errors = this.validateForm();
    if(errors){
      error("Preencha todos os campos obrigatórios!");
      return;
    }
    try {
      let data = {"name": name, "code": code, "price": price, "description": description};
      await api.post('/produtos/', data);
      success("Produto adicionado com sucesso!");
      this.props.callback(false);
    } catch (e) {
      error(e.response.data.error !== "Produto already exists." ? "Ops... algum problema" : "Produto com mesmo código existente");
    }
  }

  validateForm = () => {
    const errors = {};
    const {name, code, price, description} = this.state;

    if (name === "") {
      errors["name"] = true;
    }
    if (code === "") {
      errors["code"] = true;
    }
    if (price === "") {
      errors["price"] = true;
    }
    if (description === "") {
      errors["description"] = true;
    }
    
    this.setState({ errors });
    return Object.keys(errors).length;
  };

  clear = () => {
    this.setState({name: "",code: "", price:"", description:""})
  };

  render() {
    const {name, code, price, description ,errors} = this.state;

    return (
      <Modal
        onClose={() => {this.props.callback(false)}}
        onOpen={() => this.setState({deleteModal: true})}
        onUnmount={()=> this.clear()}
        open={this.props.show}
      >
        <Modal.Header>Adicionar Produto</Modal.Header>
        <Modal.Content >
          <Form>
            <div style={{display:"flex",justifyContent:"space-between"}}>
            <Form.Input
              label="Nome"
              placeholder="Produto de boa qualidade"
              name="name"
              error={errors["name"] ? true : false}
              maxLength="30"
              value={name}
              onChange={(e)=>this.setState({name: e.target.value})}
              required
              width={10}
            />
            <Form.Input
              label="Código"
              placeholder="22883044"
              name="code"
              maxLength="30"
              value={code}
              error={errors["code"] ? true : false}
              onChange={(e)=>this.setState({code: e.target.value})}
              required
              width={5}
            />
            </div>
            <div style={{display:"flex",justifyContent:"space-between"}}>
            <Form.Input
              label="Preço"
              placeholder="1,99"
              required
              type="number"
              name="price"
              maxLength="6"
              value={price}
              error={errors["price"] ? true : false}
              onChange={(e)=>this.setState({price: e.target.value})}
              width={7}
            />
            <Form.Input
              label="Descrição"
              placeholder="produto para algo..."
              required
              value={description}
              maxLength="50"
              error={errors["description"] ? true : false}
              onChange={(e)=>this.setState({description: e.target.value})}
              name="description"
              width={8}
            />
            </div>

          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color='red' basic onClick={() => {this.props.callback(false)}}>
            Cancelar
          </Button>
          <Button
            content="Adicionar"
            labelPosition='right'
            icon='checkmark'
            onClick={() => {this.onAdd()}}
            positive
          />
        </Modal.Actions>
      </Modal>
    );
  }
}
