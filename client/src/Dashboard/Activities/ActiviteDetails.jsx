import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Axios from '../../api'; // Assuming Axios is set up
import { FaCity, FaRegCalendarAlt } from 'react-icons/fa';
import "./Activites.css"; // Custom CSS file
import { IoPersonAdd } from "react-icons/io5";



function ActiviteDetails() {
  const { id } = useParams();
  const [activite, setActivite] = useState(null);
  const [beneficiaires, setBeneficiaires] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBeneficiaireModalOpen, setIsBeneficiaireModalOpen] = useState(false); // New state for beneficiaire modal
  const [villeId, setVilleId] = useState('');
  const [newBeneficiaire, setNewBeneficiaire] = useState({
    nom: '',
    email: '',
    telephone: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchActivite = async () => {
      try {
        const response = await Axios.get(`/activites/${id}`);
        setActivite(response.data);
        setBeneficiaires(response.data.beneficiers);
      } catch (error) {
        console.error('Error fetching activite details:', error);
      }
    };
    fetchActivite();
  }, [id]);

  const handleAddBeneficiaire = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await Axios.post(`/beneficiaires`, {...newBeneficiaire,activite_id:activite.id,ville_id:activite.ville.id});
      setIsBeneficiaireModalOpen(false);
      setNewBeneficiaire({ nom: '', email: '', telephone: '' });
      const response = await Axios.get(`/activites/${id}`);
      setBeneficiaires(response.data.beneficiers);
    } catch (error) {
      console.error('Error adding beneficiaire:', error);
    } finally {
      setLoading(false);
    }
  };

  const openBeneficiaireModal = () => setIsBeneficiaireModalOpen(true);
  const closeBeneficiaireModal = () => setIsBeneficiaireModalOpen(false);

  if (!activite) return <div>Loading...</div>;

  const activiteVille =activite.ville.nom_ville;

  return (
    <>
    <div className="activite-container">
      <div className="activite-info">
        <h1 className="activite-title">{activite.titre}</h1>
        <div className="activite-details">
          <div className="detail-item">
            <p className="detail-title"><FaCity className="icon" /> Ville: {activiteVille ? activiteVille : 'Ville non trouvée'}</p>
            <p></p> 
          </div>
          <div className="detail-item">
            <p className="detail-title"><FaRegCalendarAlt className="icon" /> Date de l'activité:</p>
            <p>{new Date(activite.date_activite).toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      <div className="beneficiaries-section">
        <h2 className="beneficiaries-title">Bénéficiaires associés</h2>
        {beneficiaires.length > 0 ? (
          <>
            <table className="beneficiaries-table">
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Email</th>
                  <th>Téléphone</th>
                </tr>
              </thead>
              <tbody>
                {beneficiaires.map((beneficiaire) => (
                  <tr key={beneficiaire.id}>
                    <td>{beneficiaire.nom}</td>
                    <td>{beneficiaire.email}</td>
                    <td>{beneficiaire.telephone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button onClick={openBeneficiaireModal} className='btn-add-new-benef'> <IoPersonAdd/> Ajouter un Bénéficiaire</button>
          </>
        ) : (
          <p>Aucun bénéficiaire associé à cette activité.</p>
        )}
      </div>
      {/* Beneficiaire Modal */}
      {isBeneficiaireModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Ajouter un Bénéficiaire</h2>
            <form onSubmit={handleAddBeneficiaire}>
              <div className="form-group">
                <label>Nom:</label>
                <input
                  type="text"
                  value={newBeneficiaire.nom}
                  onChange={(e) => setNewBeneficiaire({ ...newBeneficiaire, nom: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Prenom:</label>
                <input
                  type="text"
                  value={newBeneficiaire.prenom}
                  onChange={(e) => setNewBeneficiaire({ ...newBeneficiaire, prenom: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  value={newBeneficiaire.email}
                  onChange={(e) => setNewBeneficiaire({ ...newBeneficiaire, email: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Téléphone:</label>
                <input
                  type="tel"
                  value={newBeneficiaire.telephone}
                  onChange={(e) => setNewBeneficiaire({ ...newBeneficiaire, telephone: e.target.value })}
                  required
                />
              </div>
              <div className="modal-footer">
                <button type="button" onClick={closeBeneficiaireModal} className="cancel-buttonn">Annuler</button>
                <button type="submit" className="confirm-button" disabled={loading}>
                  {loading ? 'En cours...' : 'Ajouter'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>

    <div className="back-button">
      <button onClick={() => window.history.back()} className='btn-retour-detail-activite'>Retour</button>
    </div>
    </>
  );
}

export default ActiviteDetails;
