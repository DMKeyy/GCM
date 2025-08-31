import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { 
  FileText, 
  Plus,
  Search,
  Eye,
  Edit,
  Calendar,
  Stethoscope,
  User,
  Clock,
  AlertCircle,
  Paperclip
} from "lucide-react"
import { useForm } from "react-hook-form"

const DossiersMedicaux = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const navigate = useNavigate()
  
  const form = useForm({
    defaultValues: {
      type: "",
      motif: "",
      diagnostic: "",
      traitement: "",
      notes: ""
    }
  })

  const dossiers = [
    {
      id: 1,
      patient: { nom: "Dubois", prenom: "Marie", age: 45, telephone: "01 23 45 67 89" },
      consultations: [
        {
          id: 1,
          date: "2024-01-15",
          type: "Consultation générale",
          motif: "Contrôle hypertension",
          diagnostic: "HTA équilibrée",
          traitement: "Poursuite traitement actuel",
          notes: "Tension stable, bon suivi"
        },
        {
          id: 2,
          date: "2024-01-02",
          type: "Consultation de suivi",
          motif: "Résultats analyses",
          diagnostic: "Glycémie normale",
          traitement: "Adaptation régime",
          notes: "Bons résultats diabète"
        }
      ],
      antecedents: ["Hypertension", "Diabète type 2"],
      allergies: ["Pénicilline"],
      derniereConsultation: "2024-01-15"
    },
    {
      id: 2,
      patient: { nom: "Martin", prenom: "Jean", age: 32, telephone: "01 34 56 78 90" },
      consultations: [
        {
          id: 3,
          date: "2024-01-10",
          type: "Consultation générale",
          motif: "Toux persistante",
          diagnostic: "Bronchite",
          traitement: "Antibiotiques",
          notes: "Amélioration attendue sous 7 jours"
        }
      ],
      antecedents: ["Asthme"],
      allergies: [],
      derniereConsultation: "2024-01-10"
    },
    {
      id: 3,
      patient: { nom: "Laurent", prenom: "Sophie", age: 28, telephone: "01 45 67 89 01" },
      consultations: [
        {
          id: 4,
          date: "2024-01-08",
          type: "Consultation préventive",
          motif: "Visite annuelle",
          diagnostic: "Bilan normal",
          traitement: "Aucun",
          notes: "RAS, prochain contrôle dans 1 an"
        }
      ],
      antecedents: [],
      allergies: ["Aspirine"],
      derniereConsultation: "2024-01-08"
    }
  ]

  const filteredDossiers = dossiers.filter(dossier =>
    `${dossier.patient.prenom} ${dossier.patient.nom}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dossier.patient.telephone.includes(searchTerm)
  )

  const onSubmit = (data: any) => {
    console.log("Nouvelle consultation:", data)
    // Logique pour ajouter la consultation
    form.reset()
  }

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dossiers Médicaux</h1>
          <p className="text-muted-foreground mt-1">
            Consultez et gérez les dossiers médicaux de vos patients
          </p>
        </div>
      </div>

      {/* Search */}
      <Card className="shadow-soft">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher un dossier par nom ou téléphone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="shadow-soft">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-foreground">{dossiers.length}</p>
                <p className="text-sm text-muted-foreground">Dossiers Actifs</p>
              </div>
              <FileText className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-soft">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {dossiers.reduce((total, d) => total + d.consultations.length, 0)}
                </p>
                <p className="text-sm text-muted-foreground">Total Consultations</p>
              </div>
              <Stethoscope className="h-8 w-8 text-medical-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-foreground">3</p>
                <p className="text-sm text-muted-foreground">Consultations ce mois</p>
              </div>
              <Calendar className="h-8 w-8 text-medical-success" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Dossiers List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredDossiers.map((dossier) => (
          <Card key={dossier.id} className="shadow-soft hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-lg font-medium text-primary-foreground">
                      {dossier.patient.prenom[0]}{dossier.patient.nom[0]}
                    </span>
                  </div>
                  <div>
                    <CardTitle className="text-lg">
                      {dossier.patient.prenom} {dossier.patient.nom}
                    </CardTitle>
                    <CardDescription>
                      {dossier.patient.age} ans • {dossier.patient.telephone}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => navigate(`/dossiers/${dossier.id}`)}
                    title="Voir le dossier complet"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Antécédents et Allergies */}
              <div className="space-y-2">
                {dossier.antecedents.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Antécédents:</p>
                    <div className="flex flex-wrap gap-1">
                      {dossier.antecedents.map((antecedent, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {antecedent}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                {dossier.allergies.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Allergies:</p>
                    <div className="flex flex-wrap gap-1">
                      {dossier.allergies.map((allergie, index) => (
                        <Badge key={index} variant="destructive" className="text-xs">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          {allergie}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Dernière consultation */}
              <div className="p-3 bg-accent/50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Dernière consultation</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(dossier.derniereConsultation).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {dossier.consultations.length} consultation(s)
                  </Badge>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Plus className="h-4 w-4 mr-2" />
                      Nouvelle Consultation
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Nouvelle Consultation</DialogTitle>
                      <DialogDescription>
                        {dossier.patient.prenom} {dossier.patient.nom}
                      </DialogDescription>
                    </DialogHeader>
                    
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="type"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Type de consultation</FormLabel>
                                <FormControl>
                                  <Input placeholder="Ex: Consultation générale" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="motif"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Motif</FormLabel>
                                <FormControl>
                                  <Input placeholder="Ex: Douleur abdominale" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <FormField
                          control={form.control}
                          name="diagnostic"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Diagnostic</FormLabel>
                              <FormControl>
                                <Textarea placeholder="Diagnostic posé..." {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="traitement"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Traitement</FormLabel>
                              <FormControl>
                                <Textarea placeholder="Traitement prescrit..." {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="notes"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Notes</FormLabel>
                              <FormControl>
                                <Textarea placeholder="Notes additionnelles..." {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="flex justify-end space-x-2 pt-4">
                          <Button type="submit">
                            Enregistrer la Consultation
                          </Button>
                        </div>
                      </form>
                    </Form>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default DossiersMedicaux