import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
const ImportEmployee = (props) => {
  const { closeImport, show, importEmployees, setCsv, csv } = props;
  return (
    <div>
      <Modal isOpen={show}>
        <ModalHeader>ImportEmployee</ModalHeader>
        <ModalBody>
          <div className="row pt-2">
            <div className="col-lg-12">
              <div className="">
                <div className="d-flex justify-content-center align-items-center">
                  <div className="mb-3">
                    <label className="form-label">
                      Select Employee CSV File
                    </label>
                    <input
                      className="form-control"
                      type="file"
                      onChange={(e) => {
                        setCsv(e.target.files[0]);
                      }}
                      accept=".csv"
                      required
                    />
                    <div className="text-danger small float-right mt-2">
                      CSV headers must be name,number,email
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={closeImport}>
            Cancel
          </Button>
          <Button color="primary" onClick={importEmployees} disabled={!csv}>
            Import
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ImportEmployee;
