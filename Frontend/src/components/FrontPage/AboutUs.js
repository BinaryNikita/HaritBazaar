import React from 'react';
// import './aboutUs.css';
const AboutUsPage = () => {
  const teamMembers = [
    {
      name: 'Mansi Bisore',
      role: 'CEO & Founder',
      imageUrl: 'https://via.placeholder.com/150', // Replace with actual image URL
      description: 'John is the visionary behind our company, bringing years of experience and passion to the leadership role.',
    },
    {
      name: '',
      role: 'Nikita Vishnoi',
      imageUrl: 'https://via.placeholder.com/150', // Replace with actual image URL
      description: 'Jane leads the marketing team with innovative strategies, driving our brand to new heights.',
    },
    {
      name: 'Chachal Aklare',
      role: 'Lead Developer',
      imageUrl: 'https://via.placeholder.com/150', // Replace with actual image URL
      description: 'Michael is the backbone of our tech team, making sure everything runs smoothly and efficiently.',
    },
    {
      name: 'Bhavna Chavda',
      role: 'Product Manager',
      imageUrl: 'https://via.placeholder.com/150', // Replace with actual image URL
      description: 'Emily ensures our products meet the highest standards, collaborating with teams to deliver perfection.',
    },
    // {
    //   name: 'David Lee',
    //   role: 'Designer',
    //   imageUrl: 'https://via.placeholder.com/150', // Replace with actual image URL
    //   description: 'David is responsible for the beautiful and functional designs that make our products user-friendly.',
    // },
  ];

  return (
    <div className="about-us-container">
      <header className="about-us-header">
        <h1>Meet Our Team</h1>
        <p>We are a passionate team working together to create amazing products and experiences.</p>
      </header>

      <div className="team-container">
        {teamMembers.map((member, index) => (
          <div key={index} className="team-member-card">
            <img src={member.imageUrl} alt={member.name} className="team-member-image" />
            <h3 className="team-member-name">{member.name}</h3>
            <p className="team-member-role">{member.role}</p>
            <p className="team-member-description">{member.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUsPage;
