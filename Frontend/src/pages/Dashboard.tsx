import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Users, 
  Calendar, 
  Clock, 
  Plus,
  TrendingUp,
  Activity,
  Phone,
  AlertCircle
} from "lucide-react"

const Dashboard = () => {
  const todaysAppointments = [
    { id: 1, time: "09:00", patient: "Marie Dubois", type: "Consultation", status: "confirmed" },
    { id: 2, time: "10:30", patient: "Jean Martin", type: "Suivi", status: "confirmed" },
    { id: 3, time: "14:00", patient: "Sophie Laurent", type: "Consultation", status: "pending" },
    { id: 4, time: "15:30", patient: "Pierre Durand", type: "Contrôle", status: "confirmed" },
    { id: 5, time: "16:45", patient: "Emma Rousseau", type: "Consultation", status: "confirmed" },
  ]

  const urgentReminders = [
    { id: 1, message: "Rappeler Mme Dupont pour résultats d'analyse", priority: "high" },
    { id: 2, message: "Renouveler ordonnance - M. Bernard", priority: "medium" },
    { id: 3, message: "Planifier suivi post-opératoire - Mme Petit", priority: "high" },
  ]

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Tableau de Bord</h1>
          <p className="text-muted-foreground mt-1">
            Bienvenue Dr. Martin, voici un aperçu de votre journée
          </p>
        </div>
        <Button className="shadow-soft">
          <Plus className="h-4 w-4 mr-2" />
          Créer un Rendez-vous
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="shadow-soft hover:shadow-medium transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Patients Total
            </CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">1,247</div>
            <p className="text-xs text-medical-success flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +12% ce mois
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-soft hover:shadow-medium transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Consultations Aujourd'hui
            </CardTitle>
            <Activity className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">8</div>
            <p className="text-xs text-muted-foreground mt-1">
              5 confirmés, 1 en attente
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-soft hover:shadow-medium transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Prochains RDV
            </CardTitle>
            <Calendar className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">23</div>
            <p className="text-xs text-muted-foreground mt-1">
              Cette semaine
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-soft hover:shadow-medium transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Temps Moyen
            </CardTitle>
            <Clock className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">25min</div>
            <p className="text-xs text-muted-foreground mt-1">
              Par consultation
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Appointments */}
        <Card className="lg:col-span-2 shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-primary" />
              Rendez-vous d'Aujourd'hui
            </CardTitle>
            <CardDescription>
              {new Date().toLocaleDateString('fr-FR', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todaysAppointments.map((appointment) => (
                <div key={appointment.id} className="flex items-center justify-between p-3 bg-accent rounded-lg hover:bg-accent/80 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="text-sm font-medium text-primary bg-primary-soft px-2 py-1 rounded">
                      {appointment.time}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{appointment.patient}</p>
                      <p className="text-sm text-muted-foreground">{appointment.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge 
                      variant={appointment.status === 'confirmed' ? 'default' : 'secondary'}
                      className={appointment.status === 'confirmed' ? 'bg-medical-success text-medical-success-foreground' : ''}
                    >
                      {appointment.status === 'confirmed' ? 'Confirmé' : 'En attente'}
                    </Badge>
                    <Button variant="ghost" size="icon">
                      <Phone className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Urgent Reminders */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertCircle className="h-5 w-5 mr-2 text-medical-warning" />
              Rappels Urgents
            </CardTitle>
            <CardDescription>
              Tâches importantes à traiter
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {urgentReminders.map((reminder) => (
                <div key={reminder.id} className="p-3 border border-border rounded-lg">
                  <div className="flex items-start space-x-3">
                    <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                      reminder.priority === 'high' ? 'bg-destructive' : 'bg-medical-warning'
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm text-foreground">{reminder.message}</p>
                      <Badge variant="outline" className="mt-2 text-xs">
                        {reminder.priority === 'high' ? 'Priorité Haute' : 'Priorité Moyenne'}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard