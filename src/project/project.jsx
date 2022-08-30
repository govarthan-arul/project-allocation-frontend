import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/esm/Container";
import Accordion from "react-bootstrap/Accordion";
import { Row, Col } from "react-bootstrap";
import { Form } from "react-bootstrap";
import Input from "./input";
import Table from "react-bootstrap/Table";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchProjects } from '../redux/project/projectActions'
function Project(props) {
    console.log({props});
  const projectData = props.projects.projects;
  const [selectedProject, setSelectedProject] = useState(null);
  const [formValues, setFormValues] = useState(null);
  const [creditQuantity, setCreditQuantity] = useState(null);
  const [cell, setCell] = useState([]);
  const [postData, setPostData] = useState(null);
  const [allocationsArray, setAllocationsArray] = useState([]);
  const [key, setKey] = useState("0");
  useEffect(()=> {
    props.fetchProjectsData();
  },[])
  useEffect(() => {
    setPostData({
      projectId: selectedProject?.projectId,
      pricePerUnit: formValues?.pricePerUnit,
      alloctionPercentage: formValues?.alloctionPercentage,
      totalCredits: "",
      totalPrice: "",
      allocations: allocationsArray,
    });
  }, [formValues, allocationsArray, selectedProject]);
  const handleSelect = async (e) => {
    const project = projectData.find(
      (item) => item.projectId == e.target.value
    );
    setFormValues({ ...formValues, pricePerUnit: project.marketPrice });
    setSelectedProject(project);
  };
  const handleChange = (e) => {
    // Destructuring
    const { value, name } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const handleChangeTable1 = (e, i) => {
    // Destructuring
    const { value } = e.target;
    let tempCell = [...cell];
    tempCell[i] = value;
    setCell(tempCell);
  };
  const handleChangeTable2 = (e, i) => {
    // Destructuring
    const { value } = e.target;
    let tempCell = [{ reservationId: "", year: "", quantity: "" }];
    tempCell[i].reservationId = selectedProject?.vintages[i]?.reservationId;
    tempCell[i].year = selectedProject?.vintages[i]?.year;
    tempCell[i].quantity = value;
    let tempAlloctionsArray = [...allocationsArray, tempCell];
    setAllocationsArray(tempAlloctionsArray);
  };
  const handleCalc = (e) => {
    // Destructuring
    const value = `${e.target.value}%`;
    const percent = Math.round(
      (parseInt(e.target.value) * formValues?.quantity) / 100
    );
    setFormValues({ ...formValues, alloctionPercentage: value });
    setCreditQuantity(percent);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ postData });
    setKey("1");
  };
  //console.log({ formValues });
  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Accordion border="primary" style={{ margin: 10 }} defaultActiveKey="0">
          <Accordion.Item eventKey={key}>
            {selectedProject&& (
              <>
                <Row>
                  <Col>
                    {" "}
                    <h5>{selectedProject?.projectName}<span class="text-light bg-warning sizing" style={{fontSize:"12px",border:"5"}}> 60%</span></h5>
                  </Col>
                  <Col></Col>
                  <Col className="ms-0">
                    <FontAwesomeIcon className="ms-1" icon={faTrash} />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    {" "}
                    <h6>{"Credits : 400"}</h6>
                  </Col>
                  <Col></Col>
                  <Col><p>price/unit : 0.5  <span class="text-light bg-warning " className="ml-5"><b>  $50</b></span></p></Col>
                </Row>
              </>
            )}

            <Accordion.Header></Accordion.Header>
            <Accordion.Body>
              <Row>
                <Col>
                  <p>Quantity Requseted</p>
                  <Input
                    name="quantity"
                    type="number"
                    value={formValues?.quantity}
                    onChange={handleChange}
                  />
                </Col>
              </Row>
              <Row className="mt-3">
                <Col>
                  <p>Name of Project</p>
                  <Form.Select onChange={handleSelect}>
                    <option> - Select Project - </option>

                    {projectData?.map((item, i) => {
                      return (
                        <option value={item.projectId}>
                          {item.projectName}
                        </option>
                      );
                    })}
                  </Form.Select>
                </Col>
                <Col>
                  <p>Price/Unit</p>
                  <Input
                    name="pricePerUnit"
                    type="number"
                    value={formValues?.pricePerUnit}
                    onChange={handleChange}
                  />
                </Col>
                <Col>
                  <p>Market price/unit</p>
                  <p>
                    <b>${selectedProject?.marketPrice || 0}</b>
                    <br />
                    <span style={{ fontSize: 12 }}>
                      Last updated on May 1, 2022
                    </span>
                  </p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <p>Allocation percentage</p>
                  <Row>
                    <Col>
                      <Input
                        name="alloctionPercentage"
                        type="text"
                        value={formValues?.alloctionPercentage}
                        onChange={handleChange}
                        onBlur={handleCalc}
                      />
                    </Col>
                    <Col>
                      <p>
                        <b>Credit Quantity : {creditQuantity}</b>
                      </p>
                    </Col>
                  </Row>
                </Col>
                <Col></Col>
              </Row>
              <Card className="mt-5" style={{ backgroundColor: "#F8F8F8" }}>
                <Card.Body className="m-2">
                  <Card.Title>Allocate credits to the vintage</Card.Title>
                  <Card.Text style={{ backgroundColor: "#D9F0F3" }}>
                    Below are the list of reservations against the project.
                    Allocate quantity as per the avilability below
                  </Card.Text>
                  <Card>
                    <Table className="mt-3" bordered hover>
                      <thead
                        className="mt-1"
                        style={{ backgroundColor: "#D9F0F3" }}
                      >
                        <tr>
                          <th>Year</th>
                          <th>Reservation ID#</th>
                          <th>Purchase price/unit</th>
                          <th>Balance available for allotment</th>
                          <th colSpan={2}>Quantity allocating now</th>
                        </tr>
                      </thead>
                      <br />
                      <tbody className="mt-5">
                        {selectedProject &&
                          selectedProject?.vintages?.map((item, i) => {
                            return (
                              <>
                                <tr>
                                  <td>{item?.year}</td>
                                  <td>
                                    <a href="/">{item?.reservationId}</a>
                                  </td>
                                  <td>{item?.pricePerUnit}</td>
                                  <td>{item?.balanceAvailable}</td>
                                  <td>
                                    <input
                                      name="qty"
                                      type="number"
                                      placeholder="Enter here"
                                      value={cell[i]}
                                      onChange={(e) => handleChangeTable1(e, i)}
                                      onBlur={(e) => handleChangeTable2(e, i)}
                                    />
                                  </td>
                                  <td>
                                    <FontAwesomeIcon
                                      className="ms-1"
                                      icon={faTrash}
                                    />
                                  </td>
                                </tr>
                                <br />
                              </>
                            );
                          })}

                        <tr style={{ backgroundColor: "#D9F0F3" }}>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td colSpan={2}>
                            <b>Credits allocated: 200 | Total price: $345</b>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </Card>{" "}
                </Card.Body>
              </Card>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        <Button type="submit">+ Add Project</Button>
      </Form>
    </Container>
  );
}
const mapStateToProps = (state) => {
    return {
        projects: state.projects
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        fetchProjectsData: () => dispatch(fetchProjects())
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Project);
