
export default function Home() {
  const tarefas = [
    {unidade:"CAPS 2", tarefa:"Instalar roteador", tecnico:"", status:"pendente"},
    {unidade:"UBS Maricá", tarefa:"4 pontos de rede", tecnico:"Severino", status:"execucao"},
    {unidade:"UBS Ivete", tarefa:"2 pontos rede", tecnico:"Karla", status:"concluida"},
  ];

  const cores = {
    pendente: "red",
    execucao: "orange",
    concluida: "green"
  };

  return (
    <div style={{padding:20,fontFamily:"Arial"}}>
      <h1 style={{fontSize:40}}>Painel da equipe</h1>

      {tarefas.map((t,i)=>(
        <div key={i} style={{background:"#fff",margin:"10px 0",padding:15,borderLeft:"8px solid blue"}}>
          <div style={{fontSize:22,fontWeight:"bold"}}>{t.unidade}</div>
          <div>{t.tarefa}</div>
          <div>{t.tecnico || "-"}</div>
          <div style={{background:cores[t.status],color:"#fff",padding:8,marginTop:5}}>
            {t.status}
          </div>
        </div>
      ))}
    </div>
  );
}
