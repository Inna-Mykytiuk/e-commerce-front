import { filterOptions } from "@/config";
import PropTypes from "prop-types";

import React from "react";

import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

function ProductFilter({ filters, handleFilter }) {
  return (
    <div className="bg-background">
      <div className="border-b p-4">
        <h2 className="text-lg font-extrabold">Filters</h2>
      </div>
      <div className="space-y-4 p-4">
        {Object.keys(filterOptions).map((keyItem) => (
          <React.Fragment key={keyItem}>
            <div>
              <h3 className="text-base font-bold">{keyItem}</h3>
              <div className="mt-2 grid gap-2">
                {filterOptions[keyItem].map((option) => (
                  <Label
                    className="flex items-center gap-2 font-medium"
                    key={option.id}
                  >
                    <Checkbox
                      checked={
                        filters &&
                        Object.keys(filters).length > 0 &&
                        filters[keyItem] &&
                        filters[keyItem].indexOf(option.id) > -1
                      }
                      onCheckedChange={() => handleFilter(keyItem, option.id)}
                    />
                    {option.label}
                  </Label>
                ))}
              </div>
            </div>
            <Separator />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

ProductFilter.propTypes = {
  filters: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  handleFilter: PropTypes.func.isRequired,
};

export default ProductFilter;
