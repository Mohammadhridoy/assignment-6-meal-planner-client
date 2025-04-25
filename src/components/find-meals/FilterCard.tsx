"use client"

import { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import Select from 'react-select';
import { Button } from "../ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";


type OptionType = { label: string; value: string };

// Options
const cuisineOptions: OptionType[] = [
  { label: "Indian", value: "indian" },
  { label: "Italian", value: "italian" },
  { label: "Chinese", value: "chinese" },
  { label: "Thai", value: "thai" },
  { label: "Mexican", value: "mexican" },
];

const portionOptions: OptionType[] = [
  { label: "No-portion", value: "" },
  { label: "Small", value: "small" },
  { label: "Medium", value: "medium" },
  { label: "Large", value: "large" },
];

const mealSlotOptions: OptionType[] = [
  { label: "Breakfast", value: "Breakfast" },
  { label: "Lunch", value: "Lunch" },
  { label: "Dinner", value: "Dinner" },
];

const dietaryOptions: OptionType[] = [
  { label: "Vegan", value: "vegan" },
  { label: "Vegetarian", value: "vegetarian" },
  { label: "Gluten-Free", value: "gluten-free" },
];


const FilterCard = () => {
    
    const [searchTerm, setSearchTerm] = useState<string  >(' ');
    const [selectedCuisine, setSelectedCuisine] = useState<OptionType | null>(null);
    const [selectedPortion, setSelectedPortion] = useState<OptionType | null>(null);
    const [selectedMealSlot, setSelectedMealSlot] = useState<OptionType | null>(null);
    const [selectedDietary, setSelectedDietary] = useState<OptionType[]>([]);

  
    const handleClearFilters = () => {
      setSearchTerm(' ');
      setSelectedCuisine(null);
      setSelectedPortion(null);
      setSelectedMealSlot(null);
      setSelectedDietary([]);
     
    };

    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
  
    // const handleApplyFilters = () => {
    //   const filters = {
    //     searchTerm,
    //     selectedCuisine,
    //     selectedPortion,
    //     selectedMealSlot,
    //     selectedDietary,

    //   };
    //   console.log("Filters Applied:", filters);

    // };

    const handleSetQueryParam =  (query: string, value: string | number | boolean) => {
      const params = new URLSearchParams(searchParams.toString());
    
      if (value === "" || value === null || value === undefined) {
       
        params.delete(query);
      } else {
        params.set(query, value.toString());
      }
    
      router.push(`${pathname}?${params.toString()}`, {
        scroll: false,
      });
    
      
    
    };


  
  


    return ( 
      <div>
        <Card className="w-full p-4 mb-6">
          <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Search Input */}
            <div>
              <Label className="mb-2">Search</Label>
              <Input
                placeholder="Search meals or menus..."
                value={searchTerm}
                onChange={(e) => {setSearchTerm(e.target.value)
                  handleSetQueryParam("search", e.target.value);
                } }
              />
            </div>
  
            {/* Cuisine Filter */}
            <div>
              <Label className="mb-2">Cuisine</Label>
              <Select
                instanceId="cuisine-01"
                options={cuisineOptions}
                value={selectedCuisine}
                onChange={(val) => {setSelectedCuisine(val);  handleSetQueryParam("cuisine", val?.value || " "); } }
                placeholder="Select cuisine"
                classNamePrefix="react-select"
                isClearable
              />
            </div>
  
            {/* Portion Size Filter */}
            <div>
              <Label className="mb-2">Portion Size</Label>
              <Select
              instanceId="portion-02"
                options={portionOptions}
                value={selectedPortion}
                onChange={(val) => {setSelectedPortion(val); handleSetQueryParam("portion", val?.value || " ");}}
                placeholder="Select portion"
                classNamePrefix="react-select"
                isClearable
              />
            </div>
  
            {/* Meal Slot Filter */}
            <div>
              <Label className="mb-2">Meal Slot</Label>
              <Select
              instanceId="meal-03"
                options={mealSlotOptions}
                value={selectedMealSlot}
                onChange={(val) =>{ setSelectedMealSlot(val); handleSetQueryParam("mealSlot", val?.value || " ")}}
                placeholder="Select slot"
                classNamePrefix="react-select"
                isClearable
              />
            </div>
  
            {/* Dietary Restrictions Filter */}
            <div>
              <Label className="mb-2">Dietary Restrictions</Label>
              <Select
              instanceId="dietary-04"
                options={dietaryOptions}
                isMulti
                value={selectedDietary}
                onChange={(val) => {
                  const values = (val as OptionType[]).map((e) => e?.value).join(",");
                  setSelectedDietary(val as OptionType[]);
                  handleSetQueryParam("dietary", values);
                }}

                placeholder="Choose dietary needs"
                classNamePrefix="react-select"
                isClearable
              />
            </div>
  
            {/* Date Picker */}
           
       
  
            {/* Buttons */}
            <div className="md:col-span-2 lg:col-span-3  flex gap-4 mt-4">
            
              <Button
              className="cursor-pointer text-white"
               onClick={()=>{
                router.push(`${pathname}`,{
                  scroll:false
                })
                handleClearFilters()
              }}>
                
                Clear All
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
};

export default FilterCard;