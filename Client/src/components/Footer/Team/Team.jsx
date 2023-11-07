import styles from './Team.module.css';
import ButtonBack from '../../Utils/ButtonBack/ButtonBack';
import { Link } from 'react-router-dom';

const Team = () => {
  const teamData = [
    {
      name: 'Edder J. Alvarez',
      role: 'Chris is a front-end developer and designer. He writes a bunch of HTML, CSS, and JavaScript and shakes the pom-poms for CodePen.',
      image:
        'https://avatars.githubusercontent.com/u/120761132?v=4?fit=crop&format=auto&height=120&width=120',
      gitHubHandle: 'Drexleer',
    },
    {
      name: 'Melisa Parera',
      role: 'Hola! Soy Melisa, desarrolladora Frontend del proyecto Connectify, tengo 20 años y vivo en Argentina. Me gusta resolver problemáticas cotidianas y disfruto mucho el trabajo en equipo❤',
      image:
        'https://i.imgur.com/5UZ7MeR.jpg?fit=crop&format=auto&height=120&width=120',
      gitHubHandle: 'pareramelisa',
    },
    {
      name: 'Andres Ojeda',
      role: 'Alex is a full stack developer. Alex does JavaScript development for CodePen, both front end and back, and just about everything else.',
      image: 'https://i.imgur.com/zvmdSwA.jpg?height=120&width=120',
      gitHubHandle: 'Andy-Ojeda',
    },
    {
      name: 'Giselle Cuello',
      role: 'Alex is a full stack developer. Alex does JavaScript development for CodePen, both front end and back, and just about everything else.',
      image: 'https://i.imgur.com/A5LoSaV.jpg?height=120&width=120',
      gitHubHandle: 'GiseleCuello',
    },
    {
      name: 'Martin Lamacchia',
      role: 'Alex is a full stack developer. Alex does JavaScript development for CodePen, both front end and back, and just about everything else.',
      image: 'https://i.imgur.com/h1cOblU.jpg?height=120&width=120',
      gitHubHandle: 'MartinLamacchia',
    },
    {
      name: 'Daniela Dell Acqua',
      role: 'Alex is a full stack developer. Alex does JavaScript development for CodePen, both front end and back, and just about everything else.',
      image: 'https://i.imgur.com/feeK8Ap.jpg?height=120&width=120',
      gitHubHandle: 'danieladellacqua',
    },
    {
      name: 'German Guenov',
      role: 'Alex is a full stack developer. Alex does JavaScript development for CodePen, both front end and back, and just about everything else.',
      image: 'https://i.imgur.com/iqiPAU2.jpg?height=120&width=120',
      gitHubHandle: 'GGuenov',
    },
  ];

  return (
    <div className={styles['team-content']}>
      <ul className={styles['team-container']}>
        <div
          style={{
            color: 'red',
            top: '3em',
            left: '3em',
            position: 'absolute',
          }}
        >
          <Link to="/home">
            <ButtonBack />
          </Link>
        </div>
        <h1 className={styles['team-title']}>Nuestro Equipo</h1>
        {teamData.map((member, index) => (
          <li className={styles['team-member']} key={index}>
            <div className={styles['team-thumb']}>
              <img src={member.image} alt={member.name} />
            </div>
            <div className={styles['team-description']}>
              <h3 className={styles['team-member-title']}>{member.name}</h3>
              <p>
                {member.role}
                <br />
                <a
                  href={`https://github.com/${member.gitHubHandle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles['team-description-link']}
                >
                  @{member.gitHubHandle}
                </a>
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Team;
