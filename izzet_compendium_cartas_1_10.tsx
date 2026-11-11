import React, { useState, useEffect } from 'react';

const cardsDatabase = [
  {
    id: "arcane-signet",
    name: "Arcane Signet",
    imageFront: "https://api.scryfall.com/cards/named?exact=Arcane+Signet&format=image",
    typeFront: "Artefato",
    translationFront: "{T}: Adicione um mana de qualquer cor da identidade de cor do seu comandante.",
    explanationFront: "A pedra de mana mais eficiente do formato. Como o Iron Man é Izzet, ela sempre gerará mana azul ou vermelha, entrando desvirada e acelerando o seu jogo imediatamente no turno 2.",
    exampleFront: "No turno 2, você conjura o Arcane Signet. Ele entra desvirado, permitindo que você já o vire para gerar mana e conjurar um 'Wayfarer's Bauble' ou proteger sua mesa com um anula de custo 1.",
    notesFront: "Não possui identidade de cor própria (é incolor), mas sua habilidade está intrinsecamente ligada às cores do seu Comandante na zona de comando.",
    isDoubleFaced: false
  },
  {
    id: "blightsteel-colossus",
    name: "Blightsteel Colossus",
    imageFront: "https://api.scryfall.com/cards/named?exact=Blightsteel+Colossus&format=image",
    typeFront: "Criatura Artefato — Golem",
    translationFront: "Atropelar, infectar, indestrutível. (Esta criatura causa dano a criaturas na forma de marcadores -1/-1 e a jogadores na forma de marcadores de veneno.)\nSe Colosso de Aço Infeccionado for colocado num cemitério vindo de qualquer lugar, revele-o e, em vez disso, embaralhe-o em seu dono grimório.",
    explanationFront: "A principal condição de vitória de 'Hit Kill' do baralho. Com Infectar, ele só precisa causar 10 de dano no jogador para eliminá-lo instantaneamente do jogo, ignorando os pontos de vida. Sendo Indestrutível, é um pesadelo de ser removido.",
    exampleFront: "Você o coloca em campo de graça com a habilidade do Invincible Iron Man. No combate, ele ataca um oponente. Mesmo que o oponente bloqueie com uma criatura 1/1, o Atropelar faz com que 10 de dano passem direto como marcadores de veneno, matando o jogador na hora.",
    notesFront: "A habilidade de embaralhar no grimório é um efeito de substituição ('em vez disso'). Ele nunca chega a tocar o cemitério, o que impede que oponentes o reanimem, mas também impede que você use o Goblin Welder nele.",
    isDoubleFaced: false
  },
  {
    id: "cyberdrive-awakener",
    name: "Cyberdrive Awakener",
    imageFront: "https://api.scryfall.com/cards/named?exact=Cyberdrive+Awakener&format=image",
    typeFront: "Criatura Artefato — Construto",
    translationFront: "Voar.\nQuando Cyberdrive Awakener entrar no campo de batalha, até o final do turno, cada artefato que não seja criatura que você controla se torna uma criatura artefato com poder e resistência básicos 4/4 e ganha voar.",
    explanationFront: "Um finalizador explosivo. Ele transforma todas as suas pedras de mana passivas, equipamentos e, principalmente, suas fichas de Tesouro em um exército de criaturas 4/4 voadoras do nada.",
    exampleFront: "Você tem 8 fichas de Tesouro na mesa. Você conjura o Awakener. Imediatamente, seus Tesouros viram oito criaturas 4/4 com voar. Você ataca com 32 de dano aéreo letal no mesmo turno (se os tesouros já estavam na mesa desde o turno anterior e não têm enjoo de invocação).",
    notesFront: "Se os artefatos se tornarem criaturas no mesmo turno em que entraram em campo, eles sofrerão de enjoo de invocação e não poderão atacar, a menos que tenham ímpeto (como através do Lightning Greaves).",
    isDoubleFaced: false
  },
  {
    id: "cyclonic-rift",
    name: "Cyclonic Rift",
    imageFront: "https://api.scryfall.com/cards/named?exact=Cyclonic+Rift&format=image",
    typeFront: "Mágica Instantânea",
    translationFront: "Devolva a permanente alvo que você não controla que não seja um terreno para a mão de seu dono.\nSobrecarga {6}{U} (Você pode conjurar esta mágica pagando seu custo de sobrecarga. Se fizer isso, mude o texto substituindo 'a permanente alvo' por 'cada permanente'.)",
    explanationFront: "A limpeza de mesa mais poderosa do formato Commander. Por ser instantânea e assimétrica (só afeta os oponentes), ela abre caminho para ataques letais ou salva você de perder o jogo, desfazendo horas do progresso inimigo.",
    exampleFront: "No final do turno do oponente à sua direita (antes do seu turno começar), você paga 7 manas e conjura pelo custo de Sobrecarga. Todas as criaturas, artefatos, encantamentos e planeswalkers de todos os oponentes voltam para as mãos deles. No seu turno, a mesa estará vazia para os ataques do Iron Man.",
    notesFront: "Sobrecarga não dá alvo. Permanentes com Manto (Shroud), Resistência à Magia (Hexproof) ou Proteção contra o Azul serão devolvidas para a mão ignorando suas proteções.",
    isDoubleFaced: false
  },
  {
    id: "daretti-scrap-savant",
    name: "Daretti, Scrap Savant",
    imageFront: "https://api.scryfall.com/cards/named?exact=Daretti,+Scrap+Savant&format=image",
    typeFront: "Planeswalker Lendário — Daretti",
    translationFront: "+2: Descarte até dois cards. Depois, compre aquele mesmo número de cards.\n-2: Sacrifique um artefato. Se fizer isso, devolva o card de artefato alvo do seu cemitério para o campo de batalha.\n-10: Você recebe um emblema com 'Toda vez que um artefato for colocado no seu cemitério vindo do campo de batalha, devolva aquele card para o campo de batalha no início da próxima etapa final.'\nDaretti, Sabido da Sucata, pode ser seu comandante.",
    explanationFront: "Como Planeswalker, ele entra com marcadores de lealdade (3) e ativa uma habilidade por turno em velocidade de feitiço. O +2 permite reciclar a mão (filtragem). O -2 é o motor do deck, trocando um artefato inútil na mesa por uma bomba no cemitério. O emblema final (-10) torna todos os seus artefatos virtualmente imortais.",
    exampleFront: "Você ativa o +2 para descartar o 'Blightsteel Colossus' que estava travado na sua mão sem mana para ser conjurado. No turno seguinte, você ativa o -2, sacrifica uma simples ficha de Tesouro e traz o Colosso direto do cemitério para a mesa, economizando 12 manas.",
    notesFront: "Se você não tiver cartas na mão ou não quiser descartar, você pode ativar o +2 e escolher descartar zero cartas (e consequentemente comprar zero), apenas para aumentar a lealdade dele.",
    isDoubleFaced: false
  },
  {
    id: "darksteel-citadel",
    name: "Darksteel Citadel",
    imageFront: "https://api.scryfall.com/cards/named?exact=Darksteel+Citadel&format=image",
    typeFront: "Terreno Artefato",
    translationFront: "Indestrutível (Efeitos que dizem 'destrua' não destroem esta permanente. Uma criatura indestrutível não pode ser destruída por dano.)\n{T}: Adicione {C}.",
    explanationFront: "Um terreno que já entra como artefato, ativando todas as suas sinergias passivas e gatilhos de ETB (Enter the Battlefield). A palavra-chave 'Indestrutível' garante que ele sobreviverá a feitiços de remoção global ou a destruições de terrenos.",
    exampleFront: "Você tem a Cidadela e o 'Simulacrum Synthesizer' em campo. O simples fato da Cidadela existir faz com que os Construtos do Sintetizador sejam permanentemente mais fortes. Se alguém conjurar 'Vandalblast', sua Cidadela permanecerá ilesa, garantindo sua mana no próximo turno.",
    notesFront: "Apesar de indestrutível, você ainda pode sacrificá-la voluntariamente como custo para a habilidade do Iron Man, Daretti ou Goblin Welder, pois 'sacrificar' ignora a regra de indestrutível.",
    isDoubleFaced: false
  },
  {
    id: "desynchronization",
    name: "Desynchronization",
    imageFront: "https://api.scryfall.com/cards/named?exact=Desynchronization&format=image",
    typeFront: "Mágica Instantânea",
    translationFront: "Afinidade por artefatos (Esta mágica custa {1} a menos para ser conjurada para cada artefato que você controla.)\nDevolva todas as permanentes que não sejam artefatos para as mãos de seus donos.",
    explanationFront: "Afinidade (Affinity) é uma mecânica de redução de custo baseada na quantidade de permanentes de um tipo específico na sua mesa. Este feitiço atua como um 'Cyclonic Rift' focado e mais barato. Ele limpa a mesa inteira (criaturas, encantamentos, planeswalkers), deixando apenas os artefatos.",
    exampleFront: "Você controla 4 fichas de Tesouro e 2 pedras de mana. A Afinidade reduz o custo genérico em 6. A mágica que originalmente custava 7 manas agora custará apenas {U} (1 mana azul). Você a conjura no final do turno do oponente por 1 mana, varrendo os bloqueadores dele de volta para a mão.",
    notesFront: "A Afinidade só reduz a mana genérica (incolor). A mana colorida exigida pelo custo da carta sempre terá que ser paga. Múltiplos redutores se acumulam.",
    isDoubleFaced: false
  },
  {
    id: "emry-lurker",
    name: "Emry, Lurker of the Loch",
    imageFront: "https://api.scryfall.com/cards/named?exact=Emry,+Lurker+of+the+Loch&format=image",
    typeFront: "Criatura Lendária — Tritão Mago",
    translationFront: "Esta mágica custa {1} a menos para ser conjurada para cada artefato que você controla.\nQuando Emry, Espreitadora do Lago, entrar no campo de batalha, triture quatro cards. (Coloque os quatro cards do topo do seu grimório no seu cemitério.)\n{T}: Escolha o card de artefato alvo no seu cemitério. Você pode conjurar aquele card neste turno.",
    explanationFront: "Emry funciona como uma motor de recursão. Ela possui pseudo-Afinidade (reduzindo seu próprio custo) e a ação 'Triture' (Mill), que enche seu cemitério de recursos. Virá-la permite que você conjure artefatos do cemitério como se estivessem na sua mão.",
    exampleFront: "Você a conjura no turno 2 (custando apenas {U} se tiver 2 artefatos). Ela tritura 4 cartas e uma delas é o 'Wayfarer's Bauble'. No turno 3, você vira a Emry e conjura a Bauble direto do cemitério, garantindo terrenos extras constantemente.",
    notesFront: "A habilidade dela não burla as regras de tempo (Timing). Você só pode conjurar o artefato do cemitério durante as suas fases principais, e você ainda precisa pagar o custo de mana impresso nele normalmente.",
    isDoubleFaced: false
  },
  {
    id: "etherium-sculptor",
    name: "Etherium Sculptor",
    imageFront: "https://api.scryfall.com/cards/named?exact=Etherium+Sculptor&format=image",
    typeFront: "Criatura Artefato — Vedalkeano Artífice",
    translationFront: "As mágicas de artefato que você conjura custam {1} a menos para serem conjuradas.",
    explanationFront: "Um redutor de custos estático que atua como um acelerador de mana passivo para absolutamente toda mágica de artefato que você jogar, permitindo combos explosivos e múltiplos feitiços no mesmo turno.",
    exampleFront: "Com o Escultor na mesa, seu 'Sensei's Divining Top' custa 0 manas para ser conjurado, e seu 'Solemn Simulacrum' custa apenas 3 manas em vez de 4. Se você conjurar 3 artefatos no mesmo turno, ele terá 'gerado' 3 manas virtuais para você.",
    notesFront: "Se você tiver o Escultor e a 'Shuri, Wakandan Inventor' no campo de batalha, os efeitos se acumulam, e seus artefatos custarão 2 manas genéricas a menos.",
    isDoubleFaced: false
  },
  {
    id: "fabricate",
    name: "Fabricate",
    imageFront: "https://api.scryfall.com/cards/named?exact=Fabricate&format=image",
    typeFront: "Feitiço",
    translationFront: "Procure em seu grimório um card de artefato, revele-o e coloque-o na sua mão. Depois, embaralhe seu grimório.",
    explanationFront: "A ação de buscar cartas específicas no baralho é conhecida como 'Tutor'. É a mágica mais direta e simples do deck para encontrar exatamente a peça de combo ou a ferramenta que você precisa no momento.",
    exampleFront: "Você tem mana sobrando, mas a mão vazia. Você conjura Fabricate, busca 'The One Ring', revela para os oponentes e o coloca na mão para conjurá-lo logo em seguida, garantindo vantagem absurda de cartas.",
    notesFront: "Como o texto inclui a instrução 'revele-o' (Reveal), você é obrigado a mostrar a carta que escolheu para todos os oponentes. O jogo exige isso para provar que você não buscou ilegalmente um Feitiço ou Terreno, já que a restrição da carta é buscar 'um card de artefato'.",
    isDoubleFaced: false
  }
];

export default function IzzetCompendium() {
  const [selectedCard, setSelectedCard] = useState(null);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    if (selectedCard) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedCard]);

  return (
    <div className="min-h-screen bg-slate-950 p-6 font-sans text-slate-200">
      <header className="mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-red-500 uppercase drop-shadow-[0_0_10px_rgba(34,211,238,0.4)]">
          Sistema I.Z.Z.E.T.
        </h1>
        <p className="mt-2 text-slate-400 italic">Arquivos Táticos: Iron Man Artifacts (Cartas 1 a 10)</p>
      </header>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 max-w-7xl mx-auto">
        {cardsDatabase.map((card, index) => (
          <div 
            key={index}
            onClick={() => { setSelectedCard(card); setIsFlipped(false); }}
            className="group relative cursor-pointer rounded-xl transition-all duration-300 hover:scale-105 hover:z-10 hover:shadow-[0_0_20px_rgba(239,68,68,0.5)] bg-slate-900 border border-slate-800"
          >
            <img 
              src={card.imageFront} 
              alt={card.name} 
              className="w-full h-auto rounded-xl shadow-lg"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {selectedCard && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/95 backdrop-blur-md">
          <button 
            onClick={() => setSelectedCard(null)}
            className="fixed top-4 right-4 z-50 p-2 bg-slate-800 hover:bg-red-600 rounded-full transition-colors text-white shadow-lg border border-slate-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="min-h-screen p-4 md:p-8 flex justify-center pb-20">
            <div className="w-full max-w-5xl mt-8 flex flex-col lg:flex-row gap-8">
              
              <div className="w-full lg:w-2/5 flex flex-col items-center shrink-0">
                <div className="relative w-full max-w-sm">
                  <div className="w-full transition-transform duration-700 [transform-style:preserve-3d]" style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
                    <img 
                      src={selectedCard.imageFront} 
                      alt="Face Frontal" 
                      className={`w-full rounded-2xl shadow-[0_0_30px_rgba(34,211,238,0.3)] ${isFlipped ? 'invisible absolute inset-0' : 'block'}`}
                    />
                    {selectedCard.isDoubleFaced && (
                      <img 
                        src={selectedCard.imageBack} 
                        alt="Face Traseira" 
                        className={`w-full rounded-2xl shadow-[0_0_30px_rgba(239,68,68,0.3)] [transform:rotateY(180deg)] ${!isFlipped ? 'invisible absolute inset-0' : 'block'}`}
                      />
                    )}
                  </div>
                </div>
                {selectedCard.isDoubleFaced && (
                  <button 
                    onClick={() => setIsFlipped(!isFlipped)}
                    className="mt-6 py-3 px-6 rounded-lg bg-gradient-to-r from-cyan-600 to-cyan-800 hover:from-cyan-500 hover:to-cyan-700 text-white font-bold uppercase shadow-[0_0_15px_rgba(34,211,238,0.5)]"
                  >
                    Virar Carta
                  </button>
                )}
              </div>

              <div className="w-full lg:w-3/5 text-slate-300">
                <h2 className="text-3xl font-bold text-white mb-2">{selectedCard.name}</h2>
                <p className="text-cyan-400 font-semibold mb-6 border-b border-slate-700 pb-4">{selectedCard.typeFront}</p>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-bold uppercase text-slate-500 mb-2">Tradução do Texto Original</h3>
                    <div className="bg-slate-900/80 p-4 rounded-lg border-l-4 border-cyan-500 italic whitespace-pre-line">
                      {selectedCard.translationFront}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold uppercase text-slate-500 mb-2">Explicação das Habilidades</h3>
                    <p className="bg-slate-900/50 p-4 rounded-lg border border-slate-800">{selectedCard.explanationFront}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold uppercase text-red-500 mb-2">Exemplo Prático</h3>
                    <p className="bg-red-950/20 p-4 rounded-lg border border-red-900/50">{selectedCard.exampleFront}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold uppercase text-amber-500 mb-2">Observações Importantes</h3>
                    <p className="bg-amber-950/20 p-4 rounded-lg border border-amber-900/50 text-amber-200/90">{selectedCard.notesFront}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}