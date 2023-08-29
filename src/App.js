import main_art from './main_art.png';
import my_quiz_icon from './my_quiz_icon.png'
import './App.css';
import { AiOutlineMenu } from "react-icons/ai";
import {BsPlusCircleFill } from "react-icons/bs";
import React,{ Component } from 'react';
import { BsFillShareFill } from "react-icons/bs";
import { BsBoxArrowUpRight } from "react-icons/bs";

export default class App extends Component {
  state={
    optionSelected:0,
    quizData:{
      quiz_name:'',
      questions:[{
        question:'',
        alt:[]
      }],
      gab:[]
    },
    myQuiz:{
      q_selc:undefined,
      gab_mq:[],
      auth:true
    },
    teste:[
      ()=>{
        document.title = 'Menu Quiz Foda'
        return(
          <>
          <div className='title_mainMenu'>
            <h2>Crie seu proprio quiz super daora e divertido em minutos!</h2>
            <h4>para criar basta apenas clicar nesse botao abaixo que voce poderá comer a criar o seu próprio quiz.</h4>
            <button onClick={()=>{this.handle_option(1)}} className='btn_mainMenu_createQuiz'>criar quiz</button>
          </div>
            <img className='image_mainMenu' src={main_art}/>
          </>
        )
      },
      (obj)=>{
        document.title = `creating ${obj.state.quizData.quiz_name}` || 'creating quiz'
        this.reset_mq()
        return(
        <>
          <div className="create_quiz_DIV">
            <input className='quiz_name' onInput={obj.update_quiz_name} value={obj.state.quizData.quiz_name} placeholder="digite o nome do quiz..."></input>
            <div className='scop_questions'>
              {obj.state.quizData.questions.map((q,i)=>
                <>
                  <div className='question'>
                    <input className='ipt_question' onInput={()=>this.update_question_name(i)} value={obj.state.quizData.questions[i].question} placeholder='digite a pergunta...'></input>
                    <div className='scop_c_alts'>
                      {(obj.state.quizData.questions[i].alt).map((alt,iAlt) =>
                        
                        <div className='scop_alts'>
                          <span onClick={()=>this.mark_correct(i, iAlt)}>{iAlt+1}</span>
                          <input placeholder='digite a alternativa' onInput={()=>this.update_alt(i,iAlt)} value={obj.state.quizData.questions[i].alt[iAlt]}   className='alt' id={`q${i}a${iAlt+1}`}></input>
                        </div>
                      )}
                    <button className='add_alt' onClick={()=>this.add_alt(i)}>add alt</button>
                    </div>
                  </div>
                </>
              )}
              <button onClick={()=>this.add_question()} className='btn_add_question'><BsPlusCircleFill/></button>
            </div>
            <div className='btns_quiz'>
              <button onClick={this.save_quiz} className='create_quiz'>criar!</button>
            </div>
          </div>
        </>
        )
      },
    (obj)=>{
      if(!localStorage.myQuiz) {localStorage.setItem('myQuiz','[]')}
      this.reset_mq()
      console.log(this.state.myQuiz)
      return(
        <>
          <div className='div_myQuiz'>
            <img className='img_mq' src={my_quiz_icon}></img>
            <div className='scop_myQuiz'>
              {JSON.parse(localStorage.myQuiz).map((el,i)=>
                <button onClick={()=>{this.handle_option(3,{index:i})}}>
                    {el.quiz_name}
                    <div>
                      <BsBoxArrowUpRight className='btn_go_quiz'/>
                      <BsFillShareFill className='bnt_shre'/>
                    </div>
                    </button>
               )
              }
            </div>
          </div>
        </>
      )
    },

    //------------------my quiz page ------------------------------
    (obj)=>{
      const obj_quiz = JSON.parse(localStorage.myQuiz)[obj.state.myQuiz.q_selc];
      const {myQuiz} = this.state;
      (obj_quiz.gab).forEach(e=>{
        myQuiz.gab_mq.push('')
      })
      return(
        <>
        <div className="create_quiz_DIV">
            <p disabled className='quiz_name'>{obj_quiz.quiz_name}</p>
            <div className='scop_questions'>
              {obj_quiz.questions.map((q,i) =>
                <>
                  <div className='question_mq'>
                    <p className='ipt_question'>{q.question}</p>
                    <div className='scop_c_alts'>
                      {(obj_quiz.questions[i].alt).map((alt,iAlt) =>
                        <div className='scop_alts_mq'>
                          <span onClick={()=>this.mark_alt_mq(i, iAlt)}>{iAlt+1}</span>
                          <p  className='alt' id={`q${i}a${iAlt+1}`}>{alt}</p>
                        </div> 
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className='btns_quiz'>
              <button onClick={()=>this.verif_quiz(obj_quiz.gab)} className='env_quiz'>ver resultado</button>
            </div>
          </div>
          </>
      )
    },
    (obj)=>{
      return(
        <>
          <h1 color='#01c380'>perquisar ainda em desenvolvimento.</h1>
        </>
      )
    }
    ]
  }

  handle_option=(i,obj)=>{
    this.setState({
      optionSelected:i//(Array.from(document.querySelectorAll('.option_bar')).findIndex(el=>el===ev.target)),
    })
    document.querySelector('.options_bar').style.display = window.screen.width<540 ? 'none' : 'flex'
    if(obj){
      const {myQuiz} = this.state
      myQuiz.q_selc = obj.index
      this.setState({
        myQuiz:myQuiz
      })
    }
  };
  update_quiz_name = (ev) =>{
    ev.preventDefault()
    const {quizData} = this.state
    quizData.quiz_name = ev.target.value
    this.setState({quizData:quizData})
    document.title = this.state.quizData.quiz_name!=='' ? `creating ${this.state.quizData.quiz_name}` : `creating quiz`
  };
  
  update_question_name = (index) => {
    const {quizData} = this.state
    //list_questions[index].question = Event.target.value
    quizData.questions[index].question = document.querySelectorAll('.ipt_question')[index].value
    this.setState({
      quizData:quizData
    })
  };
  add_alt = (index)=>{
    const {quizData} = this.state
    quizData.questions[index].alt.push(``)
    this.setState({
      quizData:quizData
    })
    console.log(this.state.quizData.questions[index].alt)
  };
  update_alt = (index_q, index_a)=>{
    const {quizData} = this.state
    quizData.questions[index_q].alt[index_a] = document.querySelector(`#q${index_q}a${index_a+1}`).value
    this.setState({
      quizData:quizData
    })
  };
  mark_correct = (index, i_alt)=>{
    Array.from(document.querySelectorAll('.question')[index].querySelectorAll('.scop_alts')).map(e=>e.querySelector('span').classList.remove('correct'))
    document.querySelectorAll('.question')[index].querySelectorAll('.scop_alts')[i_alt].querySelector('span').classList.add('correct')
    const {quizData} = this.state
    quizData.gab[index] = i_alt
    this.setState({
      quizData:quizData
    })
  }
  add_question = () => {
    const {quizData} = this.state
    quizData.questions.push({
      question:``,
      alt:[]
    })
    this.setState({
      quizData: quizData
    })
    console.log(this.state.quizData.questions)
  };
  mark_alt_mq = (index, i_alt)=>{
    if(!this.state.myQuiz.auth) return
    Array.from(document.querySelectorAll('.question_mq')[index].querySelectorAll('.scop_alts_mq')).map(e=>e.querySelector('span').classList.remove('correct'))
    document.querySelectorAll('.question_mq')[index].querySelectorAll('.scop_alts_mq')[i_alt].querySelector('span').classList.add('correct')

    const {myQuiz} = this.state
    myQuiz.gab_mq[index] = i_alt;
    console.log(this.state.myQuiz.gab_mq)
  }
  verif_quiz = (correct_gab_mq) => {
    const {myQuiz} = this.state
    const {gab_mq} = this.state.myQuiz
    var ac = 0;
    gab_mq.map((g,i) => {
      if(g===correct_gab_mq[i]){
        ac++
        Array.from(document.querySelectorAll('.question_mq'))[i].classList.add('Qcorrect')
      }else {
        Array.from(document.querySelectorAll('.question_mq'))[i].classList.add('Qincorrect')
      }
    })
    console.log(gab_mq)
    document.querySelector('.env_quiz').remove();
    document.querySelector('.quiz_name').innerText+=` | voce acertou ${ac}/${gab_mq.length}`;
    myQuiz.auth = false
    myQuiz.gab_mq=[]
  
  }
  save_quiz = () => {
      if(!localStorage.myQuiz) {localStorage.setItem('myQuiz','[]')}
      const myQuiz= JSON.parse(localStorage.myQuiz)
      myQuiz.push(this.state.quizData)
      localStorage.setItem('myQuiz',JSON.stringify(myQuiz))
      this.setState({
        quizData:{
          quiz_name:'',
          questions:[{
            question:'',
            alt:[]
          }]
      },
      optionSelected:0

      })
  }
  show_nav_bar = ()=>{
    document.querySelector('.options_bar').style.display = 'flex'
    console.log(window)
  }
  reset_mq = ()=>{
    const {myQuiz} = this.state
    myQuiz.auth = true
    myQuiz.gab_mq=[]
    myQuiz.q_selc = undefined
  }
  render(){
    const {optionSelected, teste} = this.state;
    return (
      <>
      <nav className='navigation_bar'>
        <div className='Logo_webSiete'>
          <h1 onClick={()=>{this.handle_option(0)}} >Quiz Foda</h1>
        </div>
        <AiOutlineMenu onClick={this.show_nav_bar} className='menu_icon'/>
      </nav>


      <main>
        <div quiz_name={this.state.quizData.quiz_name} className='main_menu'>
        {teste[optionSelected](this)}
        </div>
      </main>
      
        <div className='options_bar'>
          <div onClick={()=>{this.handle_option(0)}} className='option_bar'>menu</div>
          <div onClick={()=>{this.handle_option(1)}} className='option_bar'>create</div>
          <div onClick={()=>{this.handle_option(2)}} className='option_bar'>my quiz</div>
          <div onClick={()=>{this.handle_option(4)}} className='option_bar'>search</div>
        </div>
      </>
    );

  }
}

