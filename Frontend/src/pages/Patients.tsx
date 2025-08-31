import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  Users, 
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Phone,
  Mail,
  Calendar
} from "lucide-react"

const Patients = () => {
  const [searchTerm, setSearchTerm] = useState("")

  const patients = [
    {
      id: 1,
      nom: "Dubois",
      prenom: "Marie",
      age: 45,
      telephone: "01 23 45 67 89",
      email: "marie.dubois@email.com",
      antecedents: ["Hypertension", "Diabète type 2"],
      dernierRdv: "2024-01-15",
      status: "actif"
    },
    {
      id: 2,
      nom: "Martin",
      prenom: "Jean",
      age: 32,
      telephone: "01 34 56 78 90",
      email: "jean.martin@email.com",
      antecedents: ["Asthme"],
      dernierRdv: "2024-01-10",
      status: "actif"
    },
    {
      id: 3,
      nom: "Laurent",
      prenom: "Sophie",
      age: 28,
      telephone: "01 45 67 89 01",
      email: "sophie.laurent@email.com",
      antecedents: [],
      dernierRdv: "2024-01-08",
      status: "actif"
    },
    {
      id: 4,
      nom: "Durand",
      prenom: "Pierre",
      age: 67,
      telephone: "01 56 78 90 12",
      email: "pierre.durand@email.com",
      antecedents: ["Arthrose", "Cholestérol"],
      dernierRdv: "2023-12-20",
      status: "inactif"
    },
    {
      id: 5,
      nom: "Rousseau",
      prenom: "Emma",
      age: 34,
      telephone: "01 67 89 01 23",
      email: "emma.rousseau@email.com",
      antecedents: ["Migraines"],
      dernierRdv: "2024-01-12",
      status: "actif"
    }
  ]

  const filteredPatients = patients.filter(patient =>
    `${patient.prenom} ${patient.nom}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.telephone.includes(searchTerm) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Patients</h1>
          <p className="text-muted-foreground mt-1">
            Gérez votre patientèle et accédez aux dossiers médicaux
          </p>
        </div>
        <Button className="shadow-soft">
          <Plus className="h-4 w-4 mr-2" />
          Ajouter un Patient
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="shadow-soft">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher par nom, téléphone ou email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="md:w-auto">
              <Filter className="h-4 w-4 mr-2" />
              Filtres
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="shadow-soft">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-foreground">{patients.length}</p>
                <p className="text-sm text-muted-foreground">Total Patients</p>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-soft">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {patients.filter(p => p.status === 'actif').length}
                </p>
                <p className="text-sm text-muted-foreground">Patients Actifs</p>
              </div>
              <div className="w-8 h-8 bg-medical-success rounded-full flex items-center justify-center">
                <Users className="h-4 w-4 text-medical-success-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-foreground">3</p>
                <p className="text-sm text-muted-foreground">Nouveaux ce mois</p>
              </div>
              <Calendar className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Patients Table */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>Liste des Patients</CardTitle>
          <CardDescription>
            {filteredPatients.length} patient(s) trouvé(s)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredPatients.map((patient) => (
              <div key={patient.id} className="p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-lg font-medium text-primary-foreground">
                        {patient.prenom[0]}{patient.nom[0]}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {patient.prenom} {patient.nom}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>{patient.age} ans</span>
                        <span className="flex items-center">
                          <Phone className="h-3 w-3 mr-1" />
                          {patient.telephone}
                        </span>
                        <span className="flex items-center">
                          <Mail className="h-3 w-3 mr-1" />
                          {patient.email}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 mt-2">
                        <Badge variant={patient.status === 'actif' ? 'default' : 'secondary'}>
                          {patient.status === 'actif' ? 'Actif' : 'Inactif'}
                        </Badge>
                        {patient.antecedents.length > 0 && (
                          <div className="flex space-x-1">
                            {patient.antecedents.slice(0, 2).map((antecedent, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {antecedent}
                              </Badge>
                            ))}
                            {patient.antecedents.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{patient.antecedents.length - 2}
                              </Badge>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div className="text-right text-sm">
                      <p className="text-muted-foreground">Dernier RDV</p>
                      <p className="font-medium">
                        {new Date(patient.dernierRdv).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="icon" title="Consulter le dossier">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" title="Modifier">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" title="Appeler">
                        <Phone className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Patients