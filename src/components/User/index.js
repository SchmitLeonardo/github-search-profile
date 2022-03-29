import React, { useState } from 'react';
import api from '../../services/api';
import { FaBook, FaMapMarkerAlt, FaRegStar, FaLock, FaLockOpen } from "react-icons/fa";

export const User = ({ user }) => {
    const [repos, setRepos] = useState([]);
    const [showRepos, setShowRepos] = useState(false);
    const [starred, setStarred] = useState([]);
    const [showStarred, setShowStarred] = useState(false);

    /**
   * Search user repos
   * 
   */
    function handleGetRepos() {
        api
            .get("/users/" + user.login + "/repos", {
                'headers': {
                    Accept: 'application/vnd.github.v3+json',
                    Authorization: `token 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`
                }
            })
            .then((response) => { setRepos(response.data) })
            .catch((err) => {
                console.error("ops! ocorreu um erro" + err);
            });

        // Display user's repos
        setShowRepos(true);
        setShowStarred(false);
    }

    /**
     * Search user starred
     * 
     */
    function handleGetStarred() {
        api
            .get("/users/" + user.login + "/starred", {
                'headers': {
                    Accept: 'application/vnd.github.v3+json',
                    Authorization: `token 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`
                }
            })
            .then((response) => { setStarred(response.data) })
            .catch((err) => {
                console.error("ops! ocorreu um erro" + err);
            });

        // Display user's starred
        setShowRepos(false);
        setShowStarred(true);
    }

    return (
        <div className="card">
            <div className="row pb-5">
                <div className="col-12 col-md-4 col-lg-3 col-xl-2">
                    <div className="card__image">
                        <img src={user.avatar_url} alt={user.login} />
                    </div>
                </div>
                <div className="col-12 col-md-8 col-lg-9 col-xl-10 card__profile">
                    <p className="card__profile__name">{user.name}</p>
                    <p className="card__profile__user">{user.login}</p>
                    <p className="card__profile__bio">{user.bio}</p>

                    <div className="card_profile__details">
                        {
                            user.location && (
                                <p className="card__details__item"> <FaMapMarkerAlt className="card__details__icon" /> {user.location}</p>
                            )
                        }
                        <p className="card__details__item" onClick={handleGetRepos}><FaBook className="card__details__icon" /> repos</p>
                        <p className="card__details__item" onClick={handleGetStarred}><FaRegStar className="card__details__icon" /> starred</p>
                    </div>
                </div>
            </div>
            {
                showRepos && (
                    <div className="row card__list">
                        <div className="col-12 text-sm-center">
                            <p className="card__list__title">Repositories</p>
                        </div>
                        <div className="col-12">
                            <div className="row card__list__itens">
                                {
                                    repos.map(elem => {
                                        return (
                                            <a href={elem.html_url} key={elem.id} target="_blank" rel="noreferrer" className="card__list__item m-2">
                                                <p>{elem.name} {elem.private ? <FaLock className="card__list__icon ml-2" /> : <FaLockOpen className="card__list__icon ml-2" />} </p>
                                                <p className="card__list__language">{elem.language}</p>
                                            </a>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                )
            }
            {
                showStarred && (
                    <div className="row card__list">
                        <div className="col-12 text-sm-center">
                            <p className="card__list__title">Starred</p>
                        </div>
                        <div className="col-12">
                            <div className="row card__list__itens">
                                {
                                    starred.map(elem => {
                                        return (
                                            <a key={elem.id} className="card__list__item m-2" href={elem.html_url} target="_blank" rel="noreferrer">
                                                <p>{elem.name} {elem.private ? <FaLock className="card__list__icon ml-2" /> : <FaLockOpen className="card__list__icon ml-2" />} </p>
                                                <p className="card__list__language">{elem.language}</p>
                                            </a>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}
