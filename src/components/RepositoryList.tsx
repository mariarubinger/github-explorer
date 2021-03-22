import { RepositoryItem } from "./RepositoryItem";
import { useEffect, useState } from "react";

import '../styles/repositories.scss';

/* VARIÁVEL ESTÁTICA - exemplo antes de fazer a chamada na API
 const repository = {
  name: 'unform',
  description: 'Forms in React',
  link: 'https://github.com/unform/unform'
} */

interface Repository {
  name: string;
  description: string;
  html_url: string;
}

export function RepositoryList() {
  const [repositories, setRepositories] = useState<Repository[]>([]); // como é uma listagem, o useState vai inicicar com um array vazio []

  useEffect(() => {
    fetch('https://api.github.com/users/mariarubinger/repos')
      .then(response => response.json())
      .then(data => setRepositories(data))
  }, []);

  return (
    <section className="repository-list">
      <h1>Lista de repositórios</h1>
    
      <ul>
        {repositories.map(repository => {
          return <RepositoryItem key={repository.name} repository={repository} />
        })}

        {/* <RepositoryItem repository={repository} /> /* a propriedade repository recebe o objeto repository  */}
       
      </ul>
    </section>
  );
}
