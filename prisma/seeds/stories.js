import pkg from '@prisma/client';
const { MediaType, StoryCategory } = pkg;
import { v4 as uuidv4 } from 'uuid';

export const storiesData = [
  {
    id: "1",
    title: "Encontrei com Lula, conversei com ele e fiquei feliz",
    name: "Dona Raimunda",
    description:
      "Artesã, agricultora e matriarca da família que vive em Mattas. Segue com a lida e sua vida, sendo inspiração para muitas gerações.",
    slug: "raimunda",
    regionId: "ARA",
    mediaUrl: "/images/stories/raimunda.png",
    content:`
  <p>Quer inspiração? Então vamos conhecer um pouquinho da história de Raimunda Raquel da Cruz, 82 anos, mulher branca, moradora do povoado Matatas em Salgado (SE). Ela nos inspira pela simplicidade de enxergar a vida e as dificuldades que acreditamos difíceis de transpor. Não existem obstáculos para sua ocupação nos espaços, seja pela falta de leitura ou condição geracional. Sem ter frequentado escola formal, nos dar aula de sabedoria e nos inspira a superar nossas dificuldades. Onde tem marchas e atividade sempre está presente. Por isso, o aplicativo “Do quintal a cozinha” está  “femenageando” dando nome ao nosso chatbot de <strong>Dona Raimunda</strong>, facilitando a acessibilidade às nossas conversas.</p>

  <p class="text-lg leading-relaxed text-gray-800 mb-6">Minha vida foi assim, desde pequena, com seis anos de idade, eu já trabalhava na roça com meus pais, e com sete anos já ganhava dinheiro, e graças a Deus, a minha vida é assim. Como meu pai e minha mãe me ensinaram, eu vou para a igreja, vou trabalhando. Não cheguei a frequenta a escola.</p>

  <p class="text-lg leading-relaxed text-gray-800 mb-6">Tive dezoito filhos, mas criei onze e criei dois netos. O tanto de netos, só dormindo pra contar.</p>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Ainda hoje faço roça. Agora sou viúva.  Vivo na minha roça, trabalhando, batalhando a minha vida aqui e acolá. Pouco, porque hoje eu não posso mais [por causa da]  coluna, mais ainda. Graças a Deus, vivo na minha roça, na minha feira. Minha filha não quer mais que eu vá para a feira, mas eu vou, porque eu não estou aleijada. Eu vou para a minha feira, fazer minhas feiras, fazer meus pagamentos.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Homenagem – robochat-dona Raimunda</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Bom, fiquei feliz que botaram meu nome, porque acho que eu mereço, e gostaram de mim. Até hoje, minhas amigas, graças a Deus, fizeram isso comigo, porque estão achando que eu vou ser feliz.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Chegada no Movimento</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Fui chamada por Izaldira foi quem me botou lá dentro, no movimento. Graças a Deus, até hoje, elas me ajudam. Izaldira, Madalena, Vera, elas que me ajudam a levar eu até lá.  Eu vou para todo canto. Vou para Brasília, São Paulo, Pernambuco, Caruaru, pra todo canto.
Todo canto que elas me levam, eu vou.
</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">As marchas</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Já fui pra todas as Marcha das Margaridas, foi muito bom, graças a Deus. Muitas amigas, muito conforto, tive muito conforto até hoje na minha vida com a Marcha das Margaridas, com o Movimento de Mulher Trabalhadeira Rural também, graças a Deus, fui muito feliz.
Também fui pra Marcha de Mulheres em 2010, em São Paulo, caminhei 100 quilômetros, lembro que não cansei no caminho, graças a Deus. Foi muito o caminho, mas nunca desanimei porque Jesus me sustentava.
</p>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">No outro encontro encontrei com Lula, (Brasília), conversei com ele e fiquei feliz. Ele foi muito bom comigo, graças a Deus, conversou comigo, me ajudou, me deu muita força na minha barraca. Ele disse que se eu precisasse de alguma coisa, podia mandar chamar ele, que ele vinha me ajudar. Mas, graças a Deus, não precisei, também não chamei ele, mas ele conversou muito comigo. Fiquei muito satisfeita com as palavras dele.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Produção</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Faço artesanato. Faço bordado, vagonite, ponto cruz, puxadinho, escama de peixe e faço pano de prato, coberta de taco. Vendo na feira de Salgado. Onde tem, eu vou.
Meu sítio  fica aqui mesmo, na Matatas. Quando eu comprei, só era terra. Mas agora já tenho mandioca plantada, tenho coco, tenho jaqueira e tenho pé de mangueira.
</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Trabalho</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Minhas tarefas eu faço, de  vez em quando fazer uma faxina, mas é eu mesmo. Varro casa, cozinho e vou levando a vida assim mesmo. O meu trabalho é só dentro de casa, bordando, fazendo crochê, vou na roça, boto remédio na formiga e volto para casa.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Território</h2>
  <p><strong>Minha casa é aqui e acho bom  porque graças a Deus até hoje eu moro e vivo feliz.</strong></p>
  `},
  // ------------------------------------------------------------------
  {
    id: "2",
    title: "Sou uma guerreira, trabalho todos os dias na roça",
    name: "Silvia Helena",
    description:"Mulher negra, agricultora não assentada, moradora há mais de 30 anos do Assentamento.",
    slug: "silvia-helena",
    regionId: "ARA",
    mediaUrl: "/images/stories/dita.jpg",
    content:`
  <p class="text-lg leading-relaxed text-gray-800 mb-6>Vamos conhecer a história de vida de Silvia Helena, 56 anos, ou Dita como é conhecida, mulher negra moradora há mais de 30 do Assentamento Vitória da União, no município de Santa Luzia do Itanhy (SE). Arupemba Dita é agricultora não assentada, fez sua vida trabalhando na terra de sua mãe e irmãos assentados, passou por uma infância difícil e a superação veio na conquista de sua autonomia. Ela nos conta com orgulho tudo que conquistou com a organização coletiva. 
  Sócia e militante do MMTR-SE, ela ocupa a  diretoria da Associação do seu  Assentamento. 
</p>

  <p class="text-lg leading-relaxed text-gray-800 mb-6">“Já tem mais de 30 anos que a gente mora aqui no assentamento Vitória da União. Consegui ter uma roça, sou agricultora. Filha de agricultora assentada, tenho irmãos assentados. Não sou assentada  e  trabalho todos os dias na roça. No inverno planto muita verdura. Trabalho muito com mandioca, macaxeira. Planto feijão de corda, feijão de arranca, milho, bananeiras, fava. Também tenho gado. Adquiri um pouco de gado. Tem de tudo pouco. Verduras, a gente planta bastante, hortaliça. E tenho minhas plantas ornamentais. Algumas ervas pra fazer chá. Crio galinha. Várias coisas. Sou uma guerreira. Levanto cedo pra batalhar, trabalhar. Tenho a minha casa pra tomar de conta. Tenho os bichos pra tomar de conta. Também participo de uma feirinha da agricultura familiar nas quartas-feiras na cidade.".</p>
  
  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Infância</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Então, a gente quase não teve infância. Começamos a trabalhar cedo. Cedo, cedo, cedo. Eu me lembro que com 9 anos já estava na luta, na roça mais meu pai plantando e cuidando de fumo que era muito, trabalhava bastante com fumo. Também com o negócio brincar era pouco. Trabalhava bastante. Estudava, a gente ia pra escola, sim. Tinha aquelas dificuldades, o colégio era longe. Mas nunca deixei de ir pra escola, sempre que a gente podia, a gente ia pra escola. Mas foi uma infância difícil. A gente trabalhou bastante. Tinha negócio de brinquedo não. Naquela época não tinha celular, não tinha bicicleta. Boneca pra brincar, nada disso. Era trabalho mesmo. Mas foi uma infância feliz, a gente tinha os irmãos, os primos, os avós. Tudo morava junto, próximo um do outro, a gente estava ali, naquela animação, naquela festa, naquela época não tinha energia. Não tinha televisão. Tinha um rádio de pilha. </p>
  
  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Sobre seus antepassados</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Minha avó, eu pedi muito cedo, mas lembro que minha avó rezava. E sempre ia dizer, não comam isso que faz mal. Do meu pai aqui na minha casa tem muito, esse negócio de fazer chá de cidreira. Tem a babosa aqui também. Eles lavavam a cabeça com babosa. De criança, eu já lavava a cabeça com babosa, ainda hoje tenho aqui em casa babosa.</p>
 
  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">As sementes</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">A gente planta e todo ano tem que guardar um pouquinho pra ter pro próximo ano. Eu ganhei uma semente de milho crioulo no Seminário de Biodiversidade em Aracaju (fev. 2025) que participei junto ao MMTR-SE, que plantei esse ano. Se a gente colhe uma abóbora, a gente corta a abóbora. A semente a gente já guarda. Põe pra secar e já guarda pro ano que vem. Mesma coisa é o quiabo, a mesma coisa é a macaxeira... Você tem que deixar pra semente pro próximo ano.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Uso da água</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">A água daqui do assentamento é poço, e a associação faz a gestão. Mas todo mundo tem água encanada em casa. No verão tem mudança na distribuição pra não faltar de forma nenhuma. O assentamento cresceu e hoje tem muitos moradores, muitas casas e no verão o gasto é maior.  E aí a gente tem mais dificuldade. Tem que saber economizar.</p>
  
    <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Sobre as mudanças climáticas</h2>

  <p class="text-lg leading-relaxed text-gray-800 mb-6">Ano passado teve uma seca que eu não tinha visto antes. Essa seca, diz minha mãe que há uns 20 anos atrás aconteceu a mesma coisa. Foi seca mesmo, uma seca que a gente perdeu até gado. Então, no verão tem que ter menos planta. E tem que aproveitar as águas, tem que tá pegando as águas que você usa, e tá colocando nas plantas. </p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Divisão de tarefas </h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Eu faço tudo sozinha. É raro meu companheiro lavar uma xícara. É raro ele colocar água na planta.  Ultimamente ele vai mais pra roça e eu estou indo menos. Mas a gente já trabalhou de igual pra igual na roça. E quando eu chegava em casa, eu tinha que fazer as coisas dele em casa. Buscar lenha, era uma tarefa minha. Mas lenha eu vou buscar de carroça, de galinhota, fecho na cabeça.  Racho lenha até hoje, eu racho lenha. 
</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Jornada diária </h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Trabalho da hora que eu levanto até a hora que eu vou deitar, eu tô fazendo as coisas. Não tem assim, quantidade de horas. Não tenho descanso, é o dia todo fazendo uma coisa ou outra, uma coisa ou outra, não paro.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Trabalho</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Por exemplo, eu limpava o terreiro, eu não sabia que o terreiro era um trabalho. Pra mim que era um terreiro que fazia parte da casa. E não é. Quer dizer, dar comida a um animal, um bicho, é um trabalho também. Doméstico, no caso cria galinha, você vai dar comida pra galinha, colocar água pra galinha. É um trabalho também.  Eu pensei que fosse fazer parte da casa, tudo, mas não é. O movimento ajudou a abrir os olhos. A gente aprende muita coisa com o Movimento.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Sua produção</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Quando a gente tiver o aplicativo e a gente vai colocar os produtos, eu acho uma excelente ideia. Vamos poder vender para além da comunidade. A associação já faz venda também em grupo.</p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Participação </h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">No Movimento já tenho  mais de 15 anos. Mas eu não sou uma pessoa, assim, do Movimento que fico na frente. Eu sou sempre, assim, mais atrás, mais calada, mais escutando. Eu gosto de participar das reuniões, de algumas viagens. Tem reunião ali, eu vou. Uma viagem ali, se puder, eu vou. Foi assim que eu cheguei, devagarzinho, devagarzinho. E continuo aí no Movimento, no que eu puder ajudar. O Movimento pra mim tem muita importância, você assistindo, acompanhando o Movimento, as reuniões, você aprende muita coisa. Muita coisa que estava lá, adormecida, você vai lembrando. É importante a gente participar pra viver com os nossos direitos, nossas obrigações. </p>

  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Tecnologia</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Sem tecnologia você não vai a lugar nenhum. Pra quem gosta tem que correr atrás. Eu sou muito preguiçosa pra aprender, mas é importante. Tem que acompanhar o mundo. </p>
  
  <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Território</h2>
  <p class="text-lg leading-relaxed text-gray-800 mb-6">Pronto, eu vim pra cá jovem, com meu pai, com minha mãe, com meus irmãos, que são assentados. E aqui fui ficando. Casei, construí minha casa, minha família. Tenho meu trabalho. Eu planto roça no terreno da minha mãe, dos meus irmãos.
  Quando chegamos aqui era uma mata, diz o povo que tinha até onça. Não tinha nada. Só mata mesmo. <i>Devagarzinho</i> foi mudando. Logo chegou energia, depois a  água encanada, Colégio para as crianças estudarem, e  foi melhorando. Se tem coisas boas, também tem coisas ruins no assentamento. Em qualquer lugar que você mora tem coisas boas.
</p>
  <p><strong>Aqui é um lugar bom de se morar. Eu gosto daqui. Eu não penso em sair daqui de forma nenhuma. </strong></p>

  `},
];

  export async function seedStories(prisma) {
    for (const story of storiesData) {
      let createdData = {
          id: story.id,
          title: story.title,
          name: story.name,
          description: story.description,
          slug: story.slug,
          content: story.content,
          region: {
            connect: { id: story.regionId }
          },
          media: {
            create: {
              media: {
              create: {
                id: uuidv4(),
                media_type: MediaType.IMAGE,
                url: story.mediaUrl,
              }
            }
            },
          },
        }
        let updatedData = {
          slug: story.slug,
          title: story.title,
          name: story.name,
          description: story.description,
          content: story.content,
          region: { connect: { id: story.regionId } },
        }
      await prisma.story.upsert({
        where: { id: story.id },
        update: updatedData,
        create: createdData,
      });
    }
    const allStories = await prisma.story.findMany();
    console.log('Story model fields:', prisma._dmmf?.modelMap?.Story?.fields.map(f => f.name));
    return allStories;
  }
