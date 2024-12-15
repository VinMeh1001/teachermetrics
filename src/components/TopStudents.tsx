import { Star, GraduationCap, Linkedin, Github, Briefcase, Trophy } from "lucide-react";
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
    location: "United States",
    image: "https://i.pravatar.cc/150?img=4",
    socialLinks: {
      linkedin: "https://linkedin.com/in/alexthompson",
      github: "https://github.com/alexthompson",
    },
    achievements: [
      {
        type: "academic",
        title: "Dean's List 2023",
        description: "Academic Excellence Award",
      },
      {
        type: "professional",
        title: "Software Engineer Intern",
        description: "Google Summer Internship",
      },
      {
        type: "project",
        title: "AI Research Project",
        description: "Published in IEEE Conference",
      },
    ],
  },
  {
    id: 2,
    name: "Maria Garcia",
    institution: "Stanford University",
    batchYear: "2023",
    rating: 4.7,
    location: "United States",
    image: "https://i.pravatar.cc/150?img=5",
    socialLinks: {
      linkedin: "https://linkedin.com/in/mariagarcia",
    },
    achievements: [
      {
        type: "professional",
        title: "Startup Founder",
        description: "EdTech Innovation Award",
      },
      {
        type: "academic",
        title: "Research Grant",
        description: "ML Applications in Healthcare",
      },
    ],
  },
  {
    id: 3,
    name: "James Wilson",
    institution: "Oxford University",
    batchYear: "2024",
    rating: 4.9,
    location: "United Kingdom",
    image: "https://i.pravatar.cc/150?img=6",
    socialLinks: {
      linkedin: "https://linkedin.com/in/jameswilson",
      github: "https://github.com/jameswilson",
    },
    achievements: [
      {
        type: "academic",
        title: "First Class Honours",
        description: "Computer Science",
      },
      {
        type: "professional",
        title: "Tech Lead",
        description: "University Innovation Lab",
      },
    ],
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
            <div className="flex-1">
              <CardTitle className="text-lg">{student.name}</CardTitle>
              <CardDescription>
                {student.institution} - {student.batchYear}
              </CardDescription>
              <div className="flex gap-2 mt-2">
                {student.socialLinks.linkedin && (
                  <a
                    href={student.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
                {student.socialLinks.github && (
                  <a
                    href={student.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-gray-900"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">{student.rating}</span>
            </div>
            <div className="text-sm text-gray-600 space-y-3">
              <p className="flex items-center gap-1">
                <GraduationCap className="w-4 h-4" />
                {student.institution}
              </p>
              <p>{student.location}</p>
              <div className="border-t pt-3 mt-3">
                <h4 className="font-semibold text-primary mb-2">Achievements</h4>
                {student.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start gap-2 mb-2">
                    {achievement.type === "academic" && <GraduationCap className="w-4 h-4 text-blue-500" />}
                    {achievement.type === "professional" && <Briefcase className="w-4 h-4 text-green-500" />}
                    {achievement.type === "project" && <Trophy className="w-4 h-4 text-yellow-500" />}
                    <div>
                      <p className="font-medium">{achievement.title}</p>
                      <p className="text-sm text-gray-500">{achievement.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TopStudents;