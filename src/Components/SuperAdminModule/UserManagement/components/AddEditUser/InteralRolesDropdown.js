import React from "react";
import { MdDelete } from "react-icons/md";

const internalRolesData = [
  {
    id: 1,
    value: 5,
    label: "Team Member",
  },
  {
    id: 2,
    value: 0,
    label: "Super Admin",
  },
  {
    id: 3,
    value: 7,
    label: "Content Manager",
  },
];
const InteralRolesDropdown = ({
  internalRoles,
  setInternalRoles,
  currentInternalRoleInput,
  setCurrentInternalRoleInput,
}) => {
  const handleInternalRolesInputChange = (e, type, selectedRoleId) => {
    const roleValue = parseInt(e.target.value);
    const role = internalRolesData.find(
      (element) => element.value === roleValue
    );
    const roleIndexInSelectedRoles = internalRoles.findIndex(
      (element) => element.id === role.id
    );
    if (!type && !selectedRoleId) {
      setCurrentInternalRoleInput(role);
    } else if (
      type &&
      type === "selected" &&
      selectedRoleId &&
      roleIndexInSelectedRoles === -1
    ) {
      const finedIndex = internalRoles.findIndex(
        (element) => element.id === selectedRoleId
      );
      let tempArray = [...internalRoles];
      tempArray[finedIndex] = role;
      setInternalRoles(tempArray);
    }
  };
  const handleAddNewRole = () => {
    if (
      currentInternalRoleInput &&
      Object.keys(currentInternalRoleInput).length !== 0
    ) {
      if (
        internalRoles.findIndex(
          (element) => element.value === currentInternalRoleInput.value
        ) === -1
      ) {
        setInternalRoles([...internalRoles, currentInternalRoleInput]);
        setCurrentInternalRoleInput({});
      }
    }
  };
  const handleDeleteRole = (id) => {
    if (id) {
      const selectedRolesList = internalRoles.filter(
        (element) => element.id !== id
      );
      setInternalRoles(selectedRolesList);
    }
  };
  return (
    <>
      <div className="col-md-10">
        {/* Selected Roles List */}
        <div className="selected-roles-list w-100">
          {internalRoles &&
            internalRoles.length !== 0 &&
            internalRoles.map((selectedRole, index) => {
              return (
                <div key={selectedRole.id} className="selected-role my-2">
                  <label className="form-control-label">
                    Select Role {index !== 0 && index + 1}
                  </label>
                  <div className="d-flex w-100 justify-content-between">
                    <select
                      className="form-control selected-role--form-control"
                      onChange={(e) =>
                        handleInternalRolesInputChange(
                          e,
                          "selected",
                          selectedRole.id
                        )
                      }
                    >
                      {internalRolesData.map((item) => {
                        const finedIndex = internalRoles.findIndex(
                          (element) => element.value === item.value
                        );
                        return (
                          <option
                            key={item.id}
                            selected={selectedRole.value === item.value}
                            disabled={finedIndex !== -1}
                            value={item.value}
                          >
                            {item.label}
                          </option>
                        );
                      })}
                    </select>
                    <button
                      className="stroke-button"
                      onClick={() => handleDeleteRole(selectedRole.id)}
                    >
                      <MdDelete />
                      &nbsp;delete role
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <div className="col-6">
        {/* Select Internal Role Input */}
        {internalRoles.length < internalRolesData.length && (
          <>
            <label className="form-control-label">
              Select Role{" "}
              {internalRoles.length !== 0 && internalRoles.length + 1}
            </label>
            <select
              className="form-control"
              onChange={handleInternalRolesInputChange}
            >
              <option
                value=""
                disabled
                selected={Object.keys(currentInternalRoleInput).length === 0}
              >
                Select Role
              </option>
              {internalRolesData.map((item) => {
                const finedIndex = internalRoles.findIndex(
                  (element) => element.value === item.value
                );
                return (
                  <option
                    key={item.id}
                    value={item.value}
                    disabled={finedIndex !== -1}
                  >
                    {item.label}
                  </option>
                );
              })}
            </select>
            <button
              className="stroke-button my-3"
              onClick={() => handleAddNewRole()}
              disabled={Object.keys(currentInternalRoleInput).length === 0}
              style={{
                opacity:
                  Object.keys(currentInternalRoleInput).length === 0
                    ? "0.6"
                    : "1",
              }}
            >
              add new role
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default InteralRolesDropdown;
