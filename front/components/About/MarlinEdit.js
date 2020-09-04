import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FormGroup, Label, Col, Row, Button, Input } from 'reactstrap'
export default ({ onChange, marlinData, onEditMode, onSave, anotherProfile }) => (
    <div className="cr-card personal-font-sm cr-bg-gray-3-background">
        <div >

        </div>
        <FormGroup row >
            <Label className={"cr-text-gray-1"} for="ShipInput" md={4} sm={4}>SCORE(990)</Label>
            <Col md={8} sm={4}>
                <div>{anotherProfile ?
                    <div >{marlinData}</div>
                    :
                    <Input type={"number"} min={0} max={990} className="about-ch-form about-font-sm-light" onChange={(e) => onChange(e)} value={marlinData} name="marlinData" />
                }
                </div>

            </Col>
        </FormGroup>
        <Row>
            <Col md={4} sm={4} className="about-btn-wrapper">
                <div>{anotherProfile ?
                ""
                :
                    <Button block className="about-btn-save" onClick={onSave} >Save Change</Button>
                }
                </div>
            </Col>
        </Row>
        {/* <style jsx>{`
            .containerSoftSkillEdit{
                background-color : rgb(230,230,230);
                padding : 20px;
                border-radius: 10px;

            }
        `}</style> */}
    </div>
)