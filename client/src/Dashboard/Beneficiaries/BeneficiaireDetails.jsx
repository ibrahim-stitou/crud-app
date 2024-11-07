import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Axios from '../../api';
import { FaEnvelope, FaPhoneAlt, FaCity, FaRegCalendarAlt } from 'react-icons/fa';
import "./BeneficiaireDetails.css";
import { MdLibraryAdd } from "react-icons/md";

function BeneficiaireDetails() {
  const { id } = useParams();
  const [beneficiaire, setBeneficiaire] = useState(null);
  const [villes, setVilles] = useState([]);
  const [activites, setActivites] = useState([]);
  const [titre, setTitre] = useState('');
  const [dateActivite, setDateActivite] = useState('');
  const [villeId, setVilleId] = useState('');
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBeneficiaire = async () => {
      try {
        const response = await Axios.get(`/beneficiaires/${id}`);
        setBeneficiaire(response.data);
      } catch (error) {
        console.error('Error fetching beneficiaire details:', error);
      }
    };
    fetchBeneficiaire();
  }, [id]);

  useEffect(() => {
    const fetchVilles = async () => {
      try {
        const response = await Axios.get('/villes');
        setVilles(response.data);
      } catch (error) {
        console.error('Error fetching villes:', error);
      }
    };
    fetchVilles();
  }, []);
  const fetchActivites = async () => {
    try {
      const response = await Axios.get(`/beneficiaires/${id}/activites`);
      setActivites(response.data);
    } catch (error) {
      console.error('Error fetching activites:', error);
    }
  };
  useEffect(() => {
    
    fetchActivites();
  }, []);

  const handleAddActivite = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        titre,
        date_activite: dateActivite,
        ville_id: villeId,
        beneficier_id: id, // Use the current beneficiaire ID
      };
      await Axios.post('/activites', payload);
      setIsModalOpen(false);
      setTitre('');
      setDateActivite('');
      setVilleId('');
      fetchActivites();
     
    } catch (error) {
      console.error('Error adding activity:', error);
    } finally {
      setLoading(false);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const beneficiaireV = villes.find((ville) => ville.id === parseInt(beneficiaire?.ville_id));

  if (!beneficiaire) return <div>Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <div className="flex flex-wrap gap-8">
        {/* Beneficiary Information */}
        <div className="beneficiary-info flex-1 min-w-[200px] bg-white shadow-lg rounded-lg p-6 border-l-4 border-green-500 mt-4">
          <h1 className="text-3xl font-bold text-center text-green-700 mb-6 mt-3">{beneficiaire.nom} {beneficiaire.prenom}</h1>
          <div className="space-y-4 mb-8">
            <div className="flex justify-between">
              <p className="text-lg font-semibold text-gray-700"><FaEnvelope className="inline mr-2" /><strong>Email:</strong> {beneficiaire.email}</p>
              <p className="text-lg font-semibold text-gray-700"><FaPhoneAlt className="inline mr-2" /><strong>Téléphone:</strong> {beneficiaire.telephone}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-lg font-semibold text-gray-700"><FaCity className="inline mr-2" /><strong>Ville:</strong> {beneficiaireV ? beneficiaireV.nom_ville : 'Ville non trouvée'}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-lg font-semibold text-gray-700"><FaRegCalendarAlt className="inline mr-2" /><strong>Date de Création:</strong> {new Date(beneficiaire.created_at).toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        {/* Activities Section */}
        <div className="activities flex-1 min-w-[300px]">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Activités effectuées</h2>
          <div className="overflow-x-auto bg-gray-100 p-4 rounded-lg shadow-md">
            <table className="min-w-full table-auto">
              <thead className="bg-blue-500 text-green-700">
                <tr>
                  <th className="px-6 py-2 text-left">Titre</th>
                  <th className="px-6 py-2 text-left">Ville</th>
                  <th className="px-6 py-2 text-left">Date de l'activité</th>
                </tr>
              </thead>
              <tbody>
                {activites.length > 0 ? (
                  activites.map((activite, index) => {
                    const activiteVille = villes.find((ville) => ville.id === activite.ville_id);
                    return (
                      <tr key={activite.id} className={`bg-${index % 2 === 0 ? 'green-100' : 'white'} border-b`}>
                        <td className="px-6 py-3">{activite.titre}</td>
                        <td className="px-6 py-3">{activiteVille ? activiteVille.nom_ville : 'Ville non trouvée'}</td>
                        <td className="px-6 py-3">{new Date(activite.date_activite).toLocaleDateString()}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="3" className="px-6 py-3 text-center text-gray-700">Aucune activité trouvée pour ce bénéficiaire.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex justify-center">
            <button
              className="bg-green-500 text-white px-6 py-2 rounded-md flex items-center gap-2 hover:bg-green-600"
              onClick={openModal}
            >
              <MdLibraryAdd/>
              Ajouter une activité
            </button>
          </div>
        </div>
      </div>

      {/* Modal for Adding Activity */}
      {isModalOpen && (
  <div className="modal-overlay">
    <div className="modal-content">
      <h2 className="text-xl font-semibold mb-4">Ajouter Activité</h2>
      <form onSubmit={handleAddActivite}>
        <div className="form-group">
          <label>Titre de l'activité:</label>
          <input
            type="text"
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Date de l'activité:</label>
          <input
            type="date"
            value={dateActivite}
            onChange={(e) => setDateActivite(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Ville:</label>
          <select
            value={villeId}
            onChange={(e) => setVilleId(e.target.value)}
            required
          >
            <option value="">Sélectionner une ville</option>
              <option value={beneficiaire.ville.id}>
                {beneficiaire.ville.nom_ville}
              </option>
          </select>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            onClick={closeModal}
            className="modal-cancel-button"
          >
            Annuler
          </button>
          <button
            type="submit"
            className="modal-confirm-button"
            disabled={loading}
          >
            {loading ? 'En cours...' : 'Ajouter'}
          </button>
        </div>
      </form>
    </div>
  </div>
)}
      {/* Back Button */}
      <div className="mt-6 flex justify-center">
        <button
          className="retour-b px-6 py-2 rounded-md hover:bg-blue-400 transition duration-300"
          onClick={() => window.history.back()}
        >
          Retour
        </button>
      </div>
    </div>
  );
}

export default BeneficiaireDetails;
