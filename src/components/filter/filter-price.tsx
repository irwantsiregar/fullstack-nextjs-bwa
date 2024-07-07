// components
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";

interface IPrice {
  min?: number,
  max?: number
}

interface FilterPriceProps {
  value?: IPrice;
  onChange: (price: IPrice) => void;
}

const FilterPrice: React.FC<FilterPriceProps> = ({ value, onChange }) => {
  const [price, setPrice] = useState<IPrice | undefined>(value);

  useEffect(() => {
    if (price) onChange(price);
  }, [price])

  return (
    <>
      <div className="text-base">Harga Minimum</div>
      <div className="my-4 relative">
        <Input
          className="w-full"
          type="text"
          placeholder=""
          prefix="text-Rp"
          value={price?.min}
          onChange={(e) => 
            setPrice({
              ...price,
              min: +e.target.value,
            }) 
          }
        />
      </div>
      <div className="text-base">Harga Maksimum</div>
      <div className="my-4 relative">
        <Input
          className="w-full"
          type="text"
          placeholder=""
          prefix="text-Rp"
          value={price?.max}
          onChange={(e) => 
            setPrice({
              ...price,
              max: +e.target.value,
            })
          }
        />
      </div>
    </>
  );
};

export default FilterPrice;
