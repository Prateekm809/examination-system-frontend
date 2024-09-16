import React, { useState, useRef, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Team.css'; // Import custom CSS

// Team member data
const teamMembers = [
  {
    id: 'm1',
    name: 'Prateek Kumar',
    title: 'Founder and Team Leader',
    image: '/Team/Prateek.png',
    bio: `I'm Prateek Kumar, a dedicated student pursuing an Advanced Diploma in IT with a focus on Networking and Cloud Computing. My journey into technology began with a fascination for web development, where I've gained expertise in React, Next.js, MySQL, MongoDB, and various cloud technologies. These tools empower me to create dynamic and scalable web solutions that meet today's industry standards.My passion for web design extends beyond technical proficiency; I thrive on crafting user-friendly interfaces and seamless experiences. I believe in the power of technology to drive innovation and solve complex challenges. Whether collaborating in teams or working independently, I approach each project with creativity and a commitment to excellence. Outside of academics, I actively explore new trends in web development, participate in coding communities, and continuously expand my skill set. My goal is not only to master current technologies but also to stay ahead in an ever-evolving digital landscape. I am eager to contribute my skills and knowledge to impactful projects that shape the future of technology.`
  },
  {
    id: 'm2',
    name: 'Varsha Prajapati',
    title: 'Team Co-leader and Manager',
    image: '/Team/Varsha.png',
    bio: "Varsha is a dedicated and ambitious professional seeking to build a career in a growing organization where she can leverage her skills and abilities to accept and conquer challenges. She holds a Certificate in Computer Software Application from the National Skill Training Institute (W) in Bengaluru, completed in 2022, and a certification as a Computer Operator Programming Assistant from the Government ITI (Women) in Jhajjar, obtained in 2020. Varsha also has a solid academic background with an Intermediate (10+2) qualification from the Haryana Board in 2019 and a Matriculation (10th) from the same board in 2017. With a robust skill set that includes proficiency in Microsoft Office (MS Word, MS Excel, PowerPoint), HTML, CSS, and Java, Varsha is well-prepared to contribute effectively to any team. Although she is a fresher in the professional world, her quick learning ability, confidence, and hardworking nature make her a valuable asset. Varsha is committed to continual personal and professional growth, and she is ready to take on new challenges and opportunities."
  },
  {
    id: 'm3',
    name: 'Rohit Kumar',
    title: 'Team member and ui manager',
    image: '/Team/Rohit.png',
    bio: "Rohit Kumar is a dedicated and driven individual currently pursuing an Advanced Diploma in IT Networking and Cloud Computing. With a strong academic background, he holds a Bachelor's degree in Political Science (Honors). Transitioning from the humanities to the tech field, Rohit has developed a diverse skill set that includes proficiency in Microsoft Office (MS Word, MS Excel, PowerPoint), HTML, CSS, Javascript ,mysql, php, express etc. Rohit's passion for technology and commitment to continuous learning has equipped him with the ability to adapt to new challenges and contribute effectively in a professional setting. Although he is a fresher in the IT industry, his quick learning ability, confidence, and hardworking nature make him a valuable team player. In his personal time, Rohit enjoys listening to music and dancing. He is fluent in Hindi and has a good command of English, with the ability to read, write, and speak the language proficiently. Rohit's personal attributes include being a quick learner, an effective team worker, confident, and hardworking."
  },
  {
    id: 'm4',
    name: 'Tannu Dhanda',
    title: 'Team member and design',
    image: '/Team/Tannu.png',
    bio: "Tannu Dhanda is a dedicated and ambitious individual from Panipat, seeking to work in an environment that fosters knowledge sharing and continuous learning. Tannu is committed to utilizing innovative skills, backed by hard work, sincerity, and dedication to excel in her career. She is currently pursuing a Diploma in Advanced Diploma in IT (ADIT) from NSTI Noida, expected to complete in 2024. She completed her 12th grade in 2021 and 10th grade in 2019 from H.P.S, Samalkha, under the CBSE board. As a fresher, Tannu brings a solid foundation in Linux, computer hardware maintenance, and computer networking. Tannu possesses strong communication skills, fluency in English, effective time management, and a positive attitude. Her key responsibilities include demonstrating leadership qualities, problem-solving, a strong work ethic, and teamwork."
  },
];

const TeamComponent = () => {
  const [activeMember, setActiveMember] = useState(teamMembers[0].id);
  const [visible, setVisible] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [memberInfo, setMemberInfo] = useState(teamMembers[0]);

  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleWheel = (e) => {
      if (scrollContainerRef.current) {
        e.preventDefault();
        scrollContainerRef.current.scrollTop += e.deltaY;
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
      }
    };
  }, []);

  const handleMemberClick = (member) => {
    if (member.id !== activeMember) {
      setFadeOut(true);
      setTimeout(() => {
        setActiveMember(member.id);
        setMemberInfo(member);
        setFadeOut(false);
      }, 300);
    }
  };

  return (
    <div className={`container bg-white text-dark p-5 mx-auto transition-opacity duration-1000 ${visible ? 'opacity-100' : 'opacity-0'} team-component`}>
      <div className="display-3 text-center mb-4 bg-gradient p-4 rounded-top">
        THE TEAM
      </div>
      <div className="row">
        <div ref={scrollContainerRef} className="col-3 overflow-auto custom-scrollbar" style={{ maxHeight: '400px' }}>
          {teamMembers.map((member) => (
            <button
              key={member.id}
              onClick={() => handleMemberClick(member)}
              className={`btn d-block mb-2 rounded overflow-hidden transition-transform ${activeMember === member.id ? 'scale-100 shadow-lg' : 'scale-90'}`}
              style={{ width: '100px', height: '100px', padding: 0 }}
            >
              <img
                src={member.image}
                alt={member.name}
                className="img-fluid"
                style={{ objectFit: 'cover' }}
              />
            </button>
          ))}
        </div>
        <div className="col-1 d-flex align-items-center">
          <div className="border border-dark" style={{ width: '2px', height: '100%' }}></div>
        </div>
        <div className="col-8 position-relative">
          <div className={`position-absolute top-0 start-0 w-100 h-100 transition-opacity ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
            <div className="d-flex rounded overflow-hidden">
              <img
                src={memberInfo.image}
                alt={memberInfo.name}
                className="img-fluid"
                style={{ maxWidth: '300px', maxHeight: '400px', objectFit: 'cover' }}
              />
              <div className="p-4 d-flex flex-column bg-dark text-white" style={{ borderRadius: '20px' }}>
                <h2 className="display-4">{memberInfo.name}</h2>
                <h3 className="text-warning mb-3">{memberInfo.title}</h3>
                <p className="text-light">{memberInfo.bio}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamComponent;
