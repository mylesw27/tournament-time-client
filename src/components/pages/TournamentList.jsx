import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios, { all } from "axios";
import TournamentsCard from "../partials/TournamentsCard";
import { Button } from "react-bootstrap";
import API from "../../API";


export default function TournamentList(props) {
    const [tournaments, setTournaments] = useState(["",""])
    const [currentUser, setCurrentUser] = useState('')

    useEffect(() => {
        setCurrentUser(props.currentUser)
        if (tournaments) {
            API.get("api/tournaments/")
            .then((response) => {
                setTournaments(response.data)
            })
        }
    },[tournaments])

    useEffect(() => {

    }, [tournaments, currentUser])

    // let filtered = []
    // const tournamentFilter = 
    //         tournaments.filter((tournament) => {
    //         console.log(tournament, currentUser)
    //         return tournament.player.id == currentUser
    //         })

    let tournamentIdArray = []
    const filterTournaments = () => {
        if(tournaments) {
            tournaments.forEach(tournament => {
                if (tournament.players) {
                    tournament.players.forEach(player => {
                        if (player.id == currentUser) {
                            tournamentIdArray.push(tournament)
                        }
                    })
                }
                
            })
        }
    }

    
    filterTournaments()

    return (
        <div>

            {tournamentIdArray.map((tournament, i) => {
                return <TournamentsCard key={i} tournament={tournament} />
            })}
        </div>
    )

}