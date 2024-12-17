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

interface SearchResult {
    id: number;
    name: string;
    country: string;
    type: "college" | "teacher" | "student";
}

interface CollegeSearchProps {
    onSelect: (result: SearchResult) => void;
}

const CollegeSearch = ({ onSelect }: CollegeSearchProps) => {
    const [open, setOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [colleges, setColleges] = useState<SearchResult[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const apiKey = 'AIzaSyAn94lwvUD8OqfBQxGgsTuEWr-oilb9c3U'; // Replace with your actual Google Places API key

    const fetchColleges = async (city: string) => {
        setLoading(true);
        setError(null);
        
        console.log(`Fetching colleges for city: ${city}`); // Debugging line
        
        try {
            const endpoint = 'https://maps.googleapis.com/maps/api/place/textsearch/json';
            const query = `colleges in ${city}`;
            console.log(`Query: ${query}, API Key: ${apiKey}`); // Log parameters
            
            const response = await axios.get(endpoint, {
                params: {
                    query: query,
                    key: apiKey
                }
            });
            
            console.log('API Response:', response.data); // Log response
            
            if (response.data.results) {
                const fetchedColleges = response.data.results.map((college, index) => ({
                    id: index + 1,
                    name: college.name + ' ' + college.formatted_address,
                    country: college.formatted_address.split(",").pop().trim(),
                    type: 'college'
                }));
                setColleges(fetchedColleges);
            } else {
                setError('No results found');
            }
        } catch (err) {
            console.error('Error fetching data from Google Places API:', err);
            setError('Failed to retrieve data');
        } finally {
            setLoading(false);
        }
    };


 // Trigger fetch when search value changes
    const handleSearchChange = (value: string) => {
        setSearchValue(value);
        if (value.length > 2) { // Fetch only if input length is greater than 2
            fetchColleges(value); // Call fetch with the city name
        }
    };
  
// Mock data for testing purposes (optional)
    const mockData = {
        colleges: [
            { id: 1, name: "Harvard University", country: "United States", type: "college" },
            { id: 2, name: "Oxford University", country: "United Kingdom", type: "college" },
            { id: 3, name: "Stanford University", country: "United States", type: "college" },
        ],
        teachers: [
            { id: 1, name: "Dr. Sarah Johnson", country: "United States", type: "teacher", institution: "Harvard University" },
            { id: 2, name: "Prof. James Smith", country: "United Kingdom", type: "teacher", institution: "Oxford University" },
        ],
        students: [
            { id: 1, name: "Alex Thompson", country: "United States", type: "student", institution: "Harvard University" },
            { id: 2, name: "James Wilson", country: "United Kingdom", type: "student", institution: "Oxford University" },
        ],
    };

  
   // Filtering logic based on search value
    const filterResults = (query: string): SearchResult[] => {
        const lowercaseQuery = query.toLowerCase();
        return mockData.colleges.filter(college =>
            college.name.toLowerCase().includes(lowercaseQuery) ||
            college.country.toLowerCase().includes(lowercaseQuery)
        );
    };

    const filteredResults = filterResults(searchValue);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <div className="relative">
                    <Input 
                        placeholder="Search colleges..." 
                        value={searchValue} 
                        onChange={(e) => handleSearchChange(e.target.value)} 
                        className="pl-10" 
                    />
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                </div>
            </PopoverTrigger>
            <PopoverContent className="w-[400px] p-0" align="start">
                <Command>
                    <CommandInput placeholder="Search..." value={searchValue} onValueChange={setSearchValue} />
                    <CommandList>
                        {loading && <div>Loading...</div>}
                        {error && <div>Error: {error}</div>}
                        {colleges.length > 0 ? (
                            colleges.map((result) => (
                                <CommandItem key={`college-${result.id}`} value={result.name} onSelect={() => {
                                    onSelect(result);
                                    setSearchValue(result.name);
                                    setOpen(false);
                                }} className="flex items-center justify-between">
                                    <span>{result.name}</span>
                                    <span className="text-sm text-gray-500">{result.country}</span>
                                </CommandItem>
                            ))
                        ) : (
                            <CommandEmpty>No results found.</CommandEmpty>
                        )}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};

export default CollegeSearch;
