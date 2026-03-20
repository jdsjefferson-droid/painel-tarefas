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
    <div style={{padding:20,fontFamily:"Arial",background:"#f4f5f7"}}>
      <h1 style={{fontSize:60,marginBottom:30}}>Painel da equipe</h1>

      {tarefas.map((t,i)=>(
        <div key={i} style={{background:"#fff",margin:"20px 0",padding:25,borderLeft:"12px solid blue",borderRadius:10}}>
          <div style={{fontSize:36,fontWeight:"bold"}}>{t.unidade}</div>
          <div style={{fontSize:32,marginTop:10,fontWeight:"600"}}>{t.tarefa}</div>
          <div style={{fontSize:28,marginTop:10}}>{t.tecnico || "-"}</div>
          <div style={{background:cores[t.status],color:"#fff",padding:15,marginTop:15,fontSize:26,fontWeight:"bold",borderRadius:8,textAlign:"center"}}>
            {t.status}
          </div>
        </div>
      ))}
    </div>
  );
}
