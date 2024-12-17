import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import axios from 'axios';

// Define the search colleges function
async function searchColleges(city: string, apiKey: string) {
    const endpoint = 'https://maps.googleapis.com/maps/api/place/textsearch/json';
    const query = `colleges in ${city}`;
    
    try {
        const response = await axios.get(endpoint, {
            params: {
                query: query,
                key: apiKey
            }
        });

        if (response.data.results) {
            const colleges = response.data.results.map((college, index) => ({
                id: index + 1,
                name: college.name + ' ' + college.formatted_address,
                country: college.formatted_address.split(",").pop().trim(),
                type: 'college'
            }));

            return { colleges };
        } else {
            return { error: 'No results found' };
        }
    } catch (error) {
        console.error('Error fetching data from Google Places API:', error);
        return { error: 'Failed to retrieve data' };
    }
}

interface SearchResult {
    id: number;
    name: string;
    country: string;
    type: "college" | "teacher" | "student";
    institution?: string;
}

interface CollegeSearchProps {
    onSelect: (result: SearchResult) => void;
}

const CollegeSearch = ({ onSelect }: CollegeSearchProps) => {
    const [open, setOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");

    // Add your filtering logic and rendering here...

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <div className="relative">
                    <Input 
                        placeholder="Search colleges..." 
                        value={searchValue} 
                        onChange={(e) => setSearchValue(e.target.value)} 
                        className="pl-10" 
                    />
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                </div>
            </PopoverTrigger>
            <PopoverContent className="w-[400px] p-0" align="start">
                <Command>
                    <CommandInput placeholder="Search..." value={searchValue} onValueChange={setSearchValue} />
                    <CommandList>
                        {/* Add your command items here */}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};

// Ensure there's only one default export
export default CollegeSearch;
