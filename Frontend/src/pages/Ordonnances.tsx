import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { 
  FileText, 
  Plus,
  Download,
  Printer,
  Search,
  Trash2,
  Edit,
  Calendar,
  User
} from "lucide-react"

const Ordonnances = () => {
  const [selectedPatient, setSelectedPatient] = useState("")
  const [medications, setMedications] = useState([
    { id: 1, name: "", dosage: "", frequency: "", duration: "", instructions: "" }
  ])

  const recentPrescriptions = [
    {
      id: 1,
      patient: "Marie Dubois",
      date: "2024-01-15",
      medications: ["Doliprane 1000mg", "Advil 400mg"],
      status: "active"
    },
    {
      id: 2,
      patient: "Jean Martin",
      date: "2024-01-14",
      medications: ["Ventoline", "Corticoïdes"],
      status: "active"
    },
    {
      id: 3,
      patient: "Sophie Laurent",
      date: "2024-01-12",
      medications: ["Amoxicilline", "Paracétamol"],
      status: "terminated"
    },
    {
      id: 4,
      patient: "Pierre Durand",
      date: "2024-01-10",
      medications: ["Metformine", "Ramipril"],
      status: "active"
    }
  ]

  const addMedication = () => {
    setMedications([...medications, {
      id: Date.now(),
      name: "",
      dosage: "",
      frequency: "",
      duration: "",
      instructions: ""
    }])
  }

  const removeMedication = (id: number) => {
    setMedications(medications.filter(med => med.id !== id))
  }

  const updateMedication = (id: number, field: string, value: string) => {
    setMedications(medications.map(med =>
      med.id === id ? { ...med, [field]: value } : med
    ))
  }

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Ordonnances</h1>
          <p className="text-muted-foreground mt-1">
            Créez et gérez les ordonnances de vos patients
          </p>
        </div>
        <Button className="shadow-soft">
          <Plus className="h-4 w-4 mr-2" />
          Nouvelle Ordonnance
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Create Prescription Form */}
        <Card className="lg:col-span-2 shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="h-5 w-5 mr-2 text-primary" />
              Création d'Ordonnance
            </CardTitle>
            <CardDescription>
              Sélectionnez le patient et ajoutez les médicaments
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Patient Selection */}
            <div className="space-y-2">
              <Label htmlFor="patient">Patient</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="patient"
                  placeholder="Rechercher et sélectionner un patient..."
                  value={selectedPatient}
                  onChange={(e) => setSelectedPatient(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Medications */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label>Médicaments</Label>
                <Button variant="outline" size="sm" onClick={addMedication}>
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter
                </Button>
              </div>

              {medications.map((medication, index) => (
                <Card key={medication.id} className="p-4 bg-accent/50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <Label>Médicament {index + 1}</Label>
                      <div className="flex items-center space-x-2">
                        <Input
                          placeholder="Nom du médicament"
                          value={medication.name}
                          onChange={(e) => updateMedication(medication.id, 'name', e.target.value)}
                        />
                        {medications.length > 1 && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeMedication(medication.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label>Dosage</Label>
                      <Input
                        placeholder="ex: 500mg"
                        value={medication.dosage}
                        onChange={(e) => updateMedication(medication.id, 'dosage', e.target.value)}
                      />
                    </div>

                    <div>
                      <Label>Fréquence</Label>
                      <Input
                        placeholder="ex: 3 fois par jour"
                        value={medication.frequency}
                        onChange={(e) => updateMedication(medication.id, 'frequency', e.target.value)}
                      />
                    </div>

                    <div>
                      <Label>Durée</Label>
                      <Input
                        placeholder="ex: 7 jours"
                        value={medication.duration}
                        onChange={(e) => updateMedication(medication.id, 'duration', e.target.value)}
                      />
                    </div>

                    <div>
                      <Label>Instructions</Label>
                      <Input
                        placeholder="ex: Avant les repas"
                        value={medication.instructions}
                        onChange={(e) => updateMedication(medication.id, 'instructions', e.target.value)}
                      />
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Additional Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes">Remarques supplémentaires</Label>
              <Textarea
                id="notes"
                placeholder="Instructions particulières, contre-indications..."
                className="min-h-[100px]"
              />
            </div>

            {/* Actions */}
            <div className="flex space-x-3 pt-4">
              <Button className="flex-1">
                <Download className="h-4 w-4 mr-2" />
                Télécharger PDF
              </Button>
              <Button variant="outline" className="flex-1">
                <Printer className="h-4 w-4 mr-2" />
                Imprimer
              </Button>
              <Button variant="outline">
                Sauvegarder
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Prescriptions */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Ordonnances Récentes</CardTitle>
            <CardDescription>
              Historique des dernières prescriptions
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Search */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher..."
                className="pl-10"
              />
            </div>

            {/* Prescriptions List */}
            <div className="space-y-3">
              {recentPrescriptions.map((prescription) => (
                <Card key={prescription.id} className="p-3 hover:bg-accent/50 transition-colors cursor-pointer">
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-foreground">{prescription.patient}</h4>
                        <p className="text-sm text-muted-foreground flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(prescription.date).toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                      <Badge variant={prescription.status === 'active' ? 'default' : 'secondary'}>
                        {prescription.status === 'active' ? 'Active' : 'Terminée'}
                      </Badge>
                    </div>
                    
                    <div className="space-y-1">
                      {prescription.medications.map((med, index) => (
                        <Badge key={index} variant="outline" className="text-xs mr-1">
                          {med}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex justify-end space-x-1 pt-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Download className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Printer className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Quick Templates */}
            <div className="mt-6 pt-4 border-t">
              <h4 className="font-medium mb-3">Modèles Rapides</h4>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  Antibiotiques Standard
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  Antalgiques
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  Anti-inflammatoires
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Ordonnances