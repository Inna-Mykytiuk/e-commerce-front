import PropTypes from "prop-types";

import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

function CommonForm({
  formControls,
  formData,
  setFormData,
  onSubmit,
  isBtnDisabled,
  buttonText,
}) {
  function renderInputsByComponentType(getControlItem) {
    let element = null;
    const value = formData[getControlItem.name] || "";

    switch (getControlItem.componentType) {
      case "input":
        element = (
          <Input
            id={getControlItem.name}
            type={getControlItem.type}
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            className="shadow-md placeholder:text-base"
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
        );
        break;
      case "select":
        element = (
          <Select
            value={value}
            onValueChange={(value) =>
              setFormData({ ...formData, [getControlItem.name]: value })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={getControlItem.label} />
            </SelectTrigger>
            <SelectContent>
              {getControlItem.options && getControlItem.options.length > 0
                ? getControlItem.options.map((optionItem) => (
                    <SelectItem key={optionItem.id} value={optionItem.id}>
                      {optionItem.label}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        );
        break;
      case "textarea":
        element = (
          <Textarea
            id={getControlItem.name}
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
        );
        break;
      default:
        element = (
          <Input
            name={getControlItem.name}
            className="shadow-md placeholder:text-base"
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
        );
        break;
    }

    return element;
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-3 text-start">
        {formControls.map((controlItem) => (
          <div className="grid w-full gap-1.5" key={controlItem.name}>
            <Label className="mb-1">{controlItem.label}</Label>
            {renderInputsByComponentType(controlItem)}
          </div>
        ))}
      </div>
      <Button
        disabled={isBtnDisabled}
        type="submit"
        className="mt-6 w-full shadow-lg"
      >
        {buttonText || "Submit"}
      </Button>
    </form>
  );
}

CommonForm.propTypes = {
  formControls: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      componentType: PropTypes.string.isRequired,
      placeholder: PropTypes.string,
      type: PropTypes.string,
      options: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          label: PropTypes.string.isRequired,
        }),
      ),
    }),
  ).isRequired,
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isBtnDisabled: PropTypes.bool,
  buttonText: PropTypes.string,
};

export default CommonForm;
