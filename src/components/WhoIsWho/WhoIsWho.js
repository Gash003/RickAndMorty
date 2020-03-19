import React from 'react';
import './whoIsWho.scss';
import Board from './Board';
import Card from './Card';

class WhoIsWho extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            randomIds: [],
            charactersArr: [],
        }
    }

    componentDidMount() {
        this.getCharacterCount(() => {
            this.getRandomIds(() => {
                this.addCharacter()
            })
        })
    }

    componentDidUpdate() {
        console.log(this.state)
    }

    getCharacterCount(callback) {
        this.setState({
            characterCount: 400
        }, callback)
    }

    getRandomIds(callback) {
        const randomIds = [];
        while (randomIds.length < 8) {
            let currentId = Math.floor(Math.random() * (this.state.characterCount - 1)) + 1
            if (randomIds.indexOf(currentId) === -1) {
                randomIds.push(currentId)
            }
        }

        this.setState({
            randomIds: randomIds
        }, callback)
    }

    addCharacter() {
        this.state.randomIds.forEach(element => {
            fetch(
                `https://rickandmortyapi.com/api/character/${element}`,
                { method: 'GET' }
            )
                .then(res => res.json())
                .then(res => {
                    this.setState({
                        charactersArr: [...this.state.charactersArr, {
                            characterId: res.id,
                            characterImg: res.image,
                            characterName: res.name
                        }]
                    })

                })
                .catch(error => console.error('error:', error))
        });
    }

    render() {
        return (
            <div className="who-is-who">
                {
                    this.state.charactersArr.map((character) =>
                        <Board
                            id={`board-${character.characterId}`}
                            key={character.characterId}
                            className="board">
                            <Card
                                className="card"
                                draggable="true">
                                <img
                                    id={`card-${character.characterId}`}
                                    src={character.characterImg}
                                    className="character__img--small"
                                    alt="character"
                                />
                            </Card>
                        </Board>
                    )
                }
                <Board
                    id="board-compare"
                    className="board__compare">
                    <Card
                        id="card-compare"
                        draggable="false">
                    </Card>
                </Board>
            </div>
        )
    }
};

export default WhoIsWho;