import React from 'react';
import { Table, Container, Row, Col, Form, Button } from 'react-bootstrap/';
import './App.css';

class OperationTable extends React.Component {
  render() {
    if (!this.props.num1 || !this.props.num2) {
      return (null);
    }

    const colsNumber = Math.max(parseInt(this.props.num1), parseInt(this.props.num2)).toString().length;
    var cols = [];
    var resultCols = [];
    for (let i = 0; i < colsNumber; i++) {
      cols.push(
        <td className="numberCol">
          <Form.Group controlId="">
            <Form.Control
              size="lg"
              type="text"
            />
          </Form.Group>
        </td>
      );
      resultCols.push(
        <td className="resultCol">
          <Form.Group controlId="">
            <Form.Control
              size="lg"
              type="text"
            />
          </Form.Group>
        </td>
      );
    }

    resultCols.push(
      <td className="resultCol">
        <Form.Group controlId="">
          <Form.Control
            size="lg"
            type="number"
          />
        </Form.Group>
      </td>
    );

    return (
      <div>
        <Table bordered hover className="operationTable" size="sm">
          <thead></thead>
          <tbody>
            <tr>
              <td className="numberCol"></td>
              {cols}
              <td className="signColumn">
                <h2>
                  {this.props.isSum ? '+' : this.props.isDiff ? '-' : ''}
                </h2>
              </td>
            </tr>
            <tr>
              <td className="numberCol"></td>
              {cols}
              <td>
                <h2>
                  =
              </h2>
              </td>
            </tr>
            <tr>
              {resultCols}
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super();
    this.state = {
      operationValid: undefined,
      isSum: undefined,
      isDiff: undefined,
      num1: null,
      num2: null,
      operation: '12+36',
      counter: 0
    };
  }

  handleOpInsertion = (e) => {
    this.setState({
      operation: e.target.value
    });

    const re = /[0-9]+[+-]?[0-9]+[=]?/g;
    if (e.target.value && re.test(e.target.value) === true) {
      const isSum = e.target.value.indexOf('+') !== -1;
      const isDiff = e.target.value.indexOf('-') !== -1;

      const numbers = e.target.value.split(isSum ? '+' : isDiff ? '-' : '');
      this.setState({
        isSum,
        isDiff,
        operationValid: true,
        num1: numbers[0],
        num2: numbers[1]
      });
    } else {
      this.setState({
        operationValid: false
      });
    }
  }

  limitOpChars(e) {
    const re = /[0-9+-=]+/g;
    if (!re.test(e.key)) {
      e.preventDefault();
    }
  }

  render() {
    let counterBalls = [];
    for (var i = 0; i < 9; i++) {
      counterBalls.push(
        <div className="counterBall" hidden={this.state.counter < i + 1 ? true : false}>
          &nbsp;
        </div>
      );
    }

    return (
      <Container>
        <Row className="title">
          <Col xs={3}>
            <h2>Operazione</h2>
          </Col>
          <Col xs={9}>
            <h2>In colonna</h2>
          </Col>
        </Row>
        <Row className="opInsertionArea">
          <Col xs={3}>
            <div>
              <Form.Group controlId="">
                <Form.Control
                  size="lg"
                  type="text"
                  placeholder="Es.: 12+36"
                  onChange={this.handleOpInsertion}
                  onKeyPress={(e) => this.limitOpChars(e)}
                  value={this.state.operation}
                />
              </Form.Group>
            </div>
          </Col>
          <Col xs={9}>
            <OperationTable
              num1={this.state.num1}
              num2={this.state.num2}
              isSum={this.state.isSum}
              isDiff={this.state.isDiff}
            ></OperationTable>
          </Col>
        </Row>
        <Row className="abacusArea">
          <h2>
            Pallottoliere
            </h2>
        </Row>
        <Row className="counterBallsContainer">
          {counterBalls}
        </Row>
        <Row className="counterButtonContainer">
          <Button variant="primary" onClick={() => this.setState({ counter: (this.state.counter + 1) % 10 })}>
            Conta!
            </Button>
        </Row>
      </Container>
    );
  }
}

export default App;
