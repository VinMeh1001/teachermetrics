import { Star, GraduationCap } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const mockStudents = [
  {
    id: 1,
    name: "Alex Thompson",
    institution: "Harvard University",
    batchYear: "2024",
    rating: 4.8,
    achievements: "Academic Excellence, Research Award",
    location: "United States",
    image: "https://i.pravatar.cc/150?img=4",
  },
  {
    id: 2,
    name: "Maria Garcia",
    institution: "Stanford University",
    batchYear: "2023",
    rating: 4.7,
    achievements: "Student Leadership, Sports Captain",
    location: "United States",
    image: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: 3,
    name: "James Wilson",
    institution: "Oxford University",
    batchYear: "2024",
    rating: 4.9,
    achievements: "Innovation Award, Debate Champion",
    location: "United Kingdom",
    image: "https://i.pravatar.cc/150?img=6",
  },
];

const TopStudents = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {mockStudents.map((student) => (
        <Card key={student.id} className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center gap-4">
            <img
              src={student.image}
              alt={student.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <CardTitle className="text-lg">{student.name}</CardTitle>
              <CardDescription>
                {student.institution} - {student.batchYear}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">{student.rating}</span>
            </div>
            <div className="text-sm text-gray-600">
              <p className="flex items-center gap-1">
                <GraduationCap className="w-4 h-4" />
                {student.achievements}
              </p>
              <p>{student.location}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TopStudents;