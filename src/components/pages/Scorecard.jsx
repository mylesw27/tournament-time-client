import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import API from "../../API";
import './Scorecard.css'
import { ArrowLeft, ChevronCompactLeft, ChevronCompactRight } from "react-bootstrap-icons";
import { Button, Form } from "react-bootstrap";

export default function Scorecard(props) {
    const currentUser = props.currentUser
    const { tournamentId } = useParams()
    const { round } = useParams()
    const [scorecard, setScorecard] = useState({}) 
    const [scoreForm, setScoreForm] = useState({
        tournament: tournamentId,
        round: round, 
        user: `${currentUser}`,
        hole1: 0,
        hole2: 0,
        hole3: 0,
        hole4: 0,
        hole5: 0,
        hole6: 0,
        hole7: 0,
        hole8: 0,
        hole9: 0,
        hole10: 0,
        hole11: 0,
        hole12: 0,
        hole13: 0,
        hole14: 0,
        hole15: 0,
        hole16: 0,
        hole17: 0,
        hole18: 0
    })
    const [currentHole, setCurrentHole] = useState(0)
    const [currentHoleScore, setCurrentHoleScore] = useState(0)
    const navigate = useNavigate()

    const findCurrentHole = (scorecard) => {
        let i = 1
        while (i <= 18) {
            if (scorecard[`hole${i}`] == 0) {
                setCurrentHoleScore(scorecard[`hole${i}`])
                return i
            } else if (i == 18) {
                setCurrentHoleScore(scorecard[`hole${i}`])
                return i
            }   else {
                i++
            }
        }
    }

    useEffect(() => {
        const requestData = {
            tournament: tournamentId,
            round: round,
            user: `${currentUser}`
        }
        if (currentUser){
            API.post('/api/scores/', requestData)
            .then((response) => {
                setScorecard(response.data)
                setScoreForm(response.data)
                console.log(response.data)
                setCurrentHole(findCurrentHole(response.data))
            })
            console.log(requestData)
            console.log(currentHoleScore, scoreForm[`hole${currentHole}`])
        }
        setCurrentHoleScore(scoreForm[`hole${currentHole}` +1 ])
    }, [currentUser])

    const handleSubmit = (e) => {
        e.preventDefault()
        API.put(`/api/scores/${scorecard.id}/`, scoreForm)
            .then((response) => {
                console.log(response)
            })
    }

    const handleSubmitAndExit = (e) => {
        e.preventDefault()
        API.put(`/api/scores/${scorecard.id}/`, scoreForm)
            .then((response) => {
                console.log(response)
            })
        console.log('click')
        navigate(`/tournament/${tournamentId}`)
    }

    const frontScore = () => {
        let sum = 0
        for (let i = 1; i <= 9; i++) {
            sum += scoreForm[`hole${i}`]
        }
        return sum
    }
    const backScore = () => {
        let sum = 0
        for (let i = 10; i <= 18; i++) {
            sum += scoreForm[`hole${i}`]
        }
        return sum
    }

    const handleIncreasePress = (e) => {
        e.preventDefault()
        setCurrentHoleScore(currentHoleScore + 1)
        setScoreForm({...scoreForm, [`hole${currentHole}`]: currentHoleScore + 1})
    }

    const handleDecreasePress = (e) => {
        e.preventDefault()
        if (currentHoleScore > 0) {
            setCurrentHoleScore(currentHoleScore - 1)
            setScoreForm({...scoreForm, [`hole${currentHole}`]: currentHoleScore - 1})
        }
    }

    const handleNextHole = (e) => {
        if (currentHole < 18) {
            e.preventDefault()
            handleSubmit(e)
            setCurrentHole(currentHole + 1)
            setCurrentHoleScore(scoreForm[`hole${currentHole + 1}`])
        }
    }

    const handlePreviousHole = (e) => {
        if (currentHole > 1) {
        e.preventDefault()
        handleSubmit(e)
        setCurrentHole(currentHole - 1)
        setCurrentHoleScore(scoreForm[`hole${currentHole - 1}`])
        }
    }

    return (
        <div className="scorecardDiv">
            {tournamentId ? <p className="back"><Link to={`/tournament/${tournamentId}/`} className="back"><ArrowLeft />back</Link></p> : null }
            <h1>Scorecard</h1>
            <Form>
                <h3 className="nineheader">Front Nine</h3>
                <div className="frontNine nine">
                <div className= {currentHole == 1 ? "hole Div activeHole" : "holeDiv"} >
                    <label htmlFor="hole1">1</label>
                    <Form.Control type="number" id="hole1" value={scoreForm.hole1} onChange={(e) => setScoreForm({...scoreForm, hole1: e.target.value})} className="scoreInput"/>
                </div>
                <div className= {currentHole == 2 ? "hole Div activeHole" : "holeDiv"} >
                    <label htmlFor="hole2">2</label>
                    <Form.Control type="number" id="hole2" value={scoreForm.hole2} onChange={(e) => setScoreForm({...scoreForm, hole2: e.target.value})} className="scoreInput" />
                </div>
                <div className= {currentHole == 3 ? "hole Div activeHole" : "holeDiv"} >
                    <label htmlFor="hole3">3</label>
                    <Form.Control type="number" id="hole3" value={scoreForm.hole3} onChange={(e) => setScoreForm({...scoreForm, hole3: e.target.value})} className="scoreInput" />
                </div>
                <div className= {currentHole == 4 ? "hole Div activeHole" : "holeDiv"} >
                    <label htmlFor="hole4">4</label>
                    <Form.Control type="number" id="hole4" value={scoreForm.hole4} onChange={(e) => setScoreForm({...scoreForm, hole4: e.target.value})} className="scoreInput" />
                </div>
                <div className= {currentHole == 5 ? "hole Div activeHole" : "holeDiv"} >
                    <label htmlFor="hole5">5</label>
                    <Form.Control type="number" id="hole5" value={scoreForm.hole5} onChange={(e) => setScoreForm({...scoreForm, hole5: e.target.value})} className="scoreInput" />
                </div>
                <div className= {currentHole == 6 ? "hole Div activeHole" : "holeDiv"} >
                    <label htmlFor="hole6">6</label>
                    <Form.Control type="number" id="hole6" value={scoreForm.hole6} onChange={(e) => setScoreForm({...scoreForm, hole6: e.target.value})} className="scoreInput" />
                </div>
                <div className= {currentHole == 7 ? "hole Div activeHole" : "holeDiv"} >
                    <label htmlFor="hole7">7</label>
                    <Form.Control type="number" id="hole7" value={scoreForm.hole7} onChange={(e) => setScoreForm({...scoreForm, hole7: e.target.value})} className="scoreInput" />
                </div>
                <div className= {currentHole == 8 ? "hole Div activeHole" : "holeDiv"} >
                    <label htmlFor="hole8">8</label>
                    <Form.Control type="number" id="hole8" value={scoreForm.hole8} onChange={(e) => setScoreForm({...scoreForm, hole8: e.target.value})} className="scoreInput" />
                </div>
                <div className= {currentHole == 9 ? "hole Div activeHole" : "holeDiv"} >
                    <label htmlFor="hole9">9</label>
                    <Form.Control type="number" id="hole9" value={scoreForm.hole9} onChange={(e) => setScoreForm({...scoreForm, hole9: e.target.value})} className="scoreInput" />
                </div>
                </div>
                <h3 className="nineheader">Back Nine</h3>
                <div className="backNine nine">
                <div className= {currentHole == 10 ? "hole Div activeHole" : "holeDiv"} >
                    <label htmlFor="hole10">10</label>
                    <Form.Control type="number" id="hole10" value={scoreForm.hole10} onChange={(e) => setScoreForm({...scoreForm, hole10: e.target.value})} className="scoreInput" />
                </div>
                <div className= {currentHole == 11 ? "hole Div activeHole" : "holeDiv"} >
                    <label htmlFor="hole11">11</label>
                    <Form.Control type="number" id="hole11" value={scoreForm.hole11} onChange={(e) => setScoreForm({...scoreForm, hole11: e.target.value})} className="scoreInput" />
                </div>
                <div className= {currentHole == 12 ? "hole Div activeHole" : "holeDiv"} >
                    <label htmlFor="hole12">12</label>
                    <Form.Control type="number" id="hole12" value={scoreForm.hole12} onChange={(e) => setScoreForm({...scoreForm, hole12: e.target.value})} className="scoreInput" />
                </div>
                <div className= {currentHole == 13 ? "hole Div activeHole" : "holeDiv"} >
                    <label htmlFor="hole13">13</label>
                    <Form.Control type="number" id="hole13" value={scoreForm.hole13} onChange={(e) => setScoreForm({...scoreForm, hole13: e.target.value})} className="scoreInput" />
                </div>
                <div className= {currentHole == 14 ? "hole Div activeHole" : "holeDiv"} >
                    <label htmlFor="hole14">14</label>
                    <Form.Control type="number" id="hole14" value={scoreForm.hole14} onChange={(e) => setScoreForm({...scoreForm, hole14: e.target.value})} className="scoreInput" />
                </div>
                <div className= {currentHole == 15 ? "hole Div activeHole" : "holeDiv"} >
                    <label htmlFor="hole15">15</label>
                    <Form.Control type="number" id="hole15" value={scoreForm.hole15} onChange={(e) => setScoreForm({...scoreForm, hole15: e.target.value})} className="scoreInput" />
                </div>
                <div className= {currentHole == 16 ? "hole Div activeHole" : "holeDiv"} >
                    <label htmlFor="hole16">16</label>
                    <Form.Control type="number" id="hole16" value={scoreForm.hole16} onChange={(e) => setScoreForm({...scoreForm, hole16: e.target.value})} className="scoreInput" />
                </div>
                <div className= {currentHole == 17 ? "hole Div activeHole" : "holeDiv"} >
                    <label htmlFor="hole17">17</label>
                    <Form.Control type="number" id="hole17" value={scoreForm.hole17} onChange={(e) => setScoreForm({...scoreForm, hole17: e.target.value})} className="scoreInput" />
                </div>
                <div className= {currentHole == 18 ? "hole Div activeHole" : "holeDiv"} >
                    <label htmlFor="hole18">18</label>
                    <Form.Control type="number" id="hole18" value={scoreForm.hole18} onChange={(e) => setScoreForm({...scoreForm, hole18: e.target.value})} className="scoreInput" />
                </div>
                </div>
                <div>
                    <div className="holeNumberDiv">
                        <h3 className="holeHeader">Hole &nbsp;</h3>
                        <h1 className="holeNumber">{currentHole}</h1>
                        <div className="totalScoresDiv">
                            <div className="totalScoreHeaders">
                                <p>Front</p>
                                <p>Back</p>
                                <h5 className="totalScore">Total</h5>
                            </div>
                            <div className="totalScoreNumbers">
                                <p>{frontScore()}</p>
                                <p>{backScore()}</p>
                                <h5 className="totalScore">{frontScore() + backScore()}</h5>
                            </div>
                        </div>
                    </div>
                    <div className="currentHoleDiv">
                        <Button className={currentHole <= 1 ? "holeButton inactiveButton" : "holeButton"} onClick={handlePreviousHole} variant="success"><ChevronCompactLeft className="chevron"/> <p>Previous Hole</p></Button>
                        <div className="scoreDiv">
                            {/* <p className="scoreWordDiv">Score</p> */}
                            <div className="currentHoleScore">{currentHoleScore} </div>
                        </div>
                        <div className="scoreButtonDiv">
                            <Button className="scoreButton" onClick={handleIncreasePress} variant="success">+</Button>
                            <Button className="scoreButton" onClick={handleDecreasePress} variant="success">-</Button>
                        </div>
                        <Button className={currentHole == 18 ? "holeButton inactiveButton" : "holeButton"} onClick={handleNextHole} variant="success"><ChevronCompactRight className="chevron"/> <p>Next Hole</p></Button>
                    </div>
                </div>
                <div className="submitButtonsDiv">
                    <div className="buttonDiv">
                            <Button type="submit" variant="success" onClick={handleSubmitAndExit} className="submitButton">Submit & Exit</Button>
                    </div>
                    <div className="buttonDiv">
                        <Button type="submit" variant="success" onClick={handleSubmit} className="submitButton">Submit</Button>
                    </div>
                </div>
            </Form>
        </div>
    )
}