import { Linkedin } from "lucide-react";
import teamEmmanuel from "@/assets/team/team-emmanuel.avif";
import teamOwen from "@/assets/team/team-owen.avif";
import teamMaissa from "@/assets/team/team-maissa.avif";
import teamIan from "@/assets/team/team-ian.avif";
import teamDanosch from "@/assets/team/team-danosch.avif";
import teamHitesh from "@/assets/team/team-hitesh.avif";
import teamAlexia from "@/assets/team/team-alexia.avif";

const teamMembers = [
  {
    name: "Emmanuel Quezada",
    role: "Founder & Chief Executive Officer",
    image: teamEmmanuel,
    linkedin: "https://ae.linkedin.com/in/emmanuel-quezada/en",
  },
  {
    name: "Owen Man Cheong Ma",
    role: "Co-Founder & Chief Revenue Officer",
    image: teamOwen,
    linkedin: "https://sg.linkedin.com/in/omcma",
  },
  {
    name: "Maissa Ballout",
    role: "Chief Financial Officer",
    image: teamMaissa,
    linkedin: "https://il.linkedin.com/in/maissa-ballout-shamshoum",
  },
  {
    name: "Ian Stirling",
    role: "Chief Strategy Officer",
    image: teamIan,
    linkedin: "https://uk.linkedin.com/in/ianscottstirling",
  },
  {
    name: "Danosch Zahedi",
    role: "Regional Network Advisor",
    image: teamDanosch,
    linkedin: "https://ae.linkedin.com/in/danoschzahedi",
  },
  {
    name: "Hitesh Mishra",
    role: "Chief Compliance Officer",
    image: teamHitesh,
    linkedin: "https://hk.linkedin.com/in/hitesh-mishra-080786",
  },
  {
    name: "Alexia Chen",
    role: "BD APAC",
    image: teamAlexia,
    linkedin: "https://ae.linkedin.com/in/alexia-chen-264078305",
  },
];

const TeamSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span 
              className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6 opacity-0 animate-fade-in-up"
              style={{ animationDelay: '100ms' }}
            >
              Leadership
            </span>
            <h2 
              className="text-3xl md:text-5xl font-bold text-foreground mb-6 opacity-0 animate-fade-in-up"
              style={{ animationDelay: '150ms' }}
            >
              Meet the team behind <span className="gradient-text">U-topia</span>
            </h2>
            <p 
              className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto opacity-0 animate-fade-in-up"
              style={{ animationDelay: '200ms' }}
            >
              We're supported by high-powered builders who value creative freedom and doing their best work. 
              In past lives, we've led teams and projects at startups, large companies, and places in between.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <a
                key={member.name}
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group opacity-0 animate-fade-in-up"
                style={{ animationDelay: `${250 + index * 100}ms` }}
              >
                <div className="feature-card p-6 h-full transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
                  <div className="relative mb-4 overflow-hidden rounded-xl">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                      <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center">
                        <Linkedin className="w-5 h-5 text-[#0077b5]" />
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {member.role}
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
