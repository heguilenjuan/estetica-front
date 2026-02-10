import { Avatar } from '../../../../components/avatar/Avatar'
import { Badge } from '../../../../components/badge/Badge'
import './SessionOverview.style.css'
export const SessionsOverview = () => (
    <div>
        <div className="session-header">
            <h3>Session Overview</h3>
            <span>View All</span>
        </div>
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">Estado</th>
                    <th scope="col">Cliente</th>
                    <th scope="col">Servicio</th>
                    <th scope="col">Hora</th>
                    <th scope="col">Acción</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td ><Badge status="inProgress"> Confirmed </Badge></td>
                    <td><Avatar /> <p>Jorge Cremades</p></td>
                    <td>Manicura</td>
                    <td>3:00 PM</td>
                    <td>
                        <menu>
                            <li>Ver</li>
                            <li>Cancelar</li>
                        </menu>
                    </td>
                </tr>
                 <tr>
                    <td ><Badge status="inProgress"> Confirmed </Badge></td>
                    <td><Avatar /> <p>Jorge Cremades</p></td>
                    <td>Manicura</td>
                    <td>3:00 PM</td>
                    <td>
                        <menu>
                            <li>Ver</li>
                            <li>Cancelar</li>
                        </menu>
                    </td>
                </tr>
                 <tr>
                    <td ><Badge status="inProgress"> Confirmed </Badge></td>
                    <td><Avatar /> <p>Jorge Cremades</p></td>
                    <td>Manicura</td>
                    <td>3:00 PM</td>
                    <td>
                        <menu>
                            <li>Ver</li>
                            <li>Cancelar</li>
                        </menu>
                    </td>
                </tr>

                 <tr>
                    <td ><Badge status="inProgress"> Confirmed </Badge></td>
                    <td><Avatar /> <p>Jorge Cremades</p></td>
                    <td>Manicura</td>
                    <td>3:00 PM</td>
                    <td>
                        <menu>
                            <li>Ver</li>
                            <li>Cancelar</li>
                        </menu>
                    </td>
                </tr>
                
            </tbody>
        </table>

    </div>
)