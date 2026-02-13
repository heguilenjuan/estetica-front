import { Avatar } from '../../../../shared/components/atoms/avatar/Avatar'
import { Badge } from '../../../../shared/components/atoms/badge/Badge'
import './SessionOverview.style.css'


export const SessionsOverview = () => (
    <table className="table">
        <thead>
            <tr>
                <th scope="col">Estado</th>
                <th scope="col">Cliente</th>
                <th scope="col">Servicio</th>
                <th scope="col">Usuario</th>
                <th scope="col">Hora</th>
                <th scope="col">Acción</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td ><Badge status="inProgress"> Confirmed </Badge></td>
                <td className='table-name'><Avatar /> <p>Jorge Cremades</p></td>
                <td>Manicura</td>
                <td>Tama</td>
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
                <td className='table-name'><Avatar /> <p>Jorge Cremades</p></td>
                <td>Manicura</td>
                <td>Tama</td>
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
                <td className='table-name'><Avatar /> <p>Jorge Cremades</p></td>
                <td>Manicura</td>
                <td>Marie Curie</td>
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
                <td className='table-name'><Avatar /> <p>Jorge Cremades</p></td>
                <td>Manicura</td>
                <td>Marie Curie</td>
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
)

