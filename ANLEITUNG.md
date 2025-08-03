# Railway Deployment Anleitung - YB Store

Diese Anleitung erklärt, wie Sie Ihr YB Store E-Commerce System vollständig auf Railway hosten.

## Voraussetzungen

- GitHub Account
- Railway Account (kostenloses Konto reicht für den Start)
- Ihr YB Store Code in einem GitHub Repository

## Schritt 1: Repository vorbereiten

1. **Repository auf GitHub erstellen**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - YB Store"
   git branch -M main
   git remote add origin https://github.com/IHR-USERNAME/yb-store.git
   git push -u origin main
   ```

## Schritt 2: Railway Projekt erstellen

1. **Railway Dashboard öffnen**
   - Gehen Sie zu [railway.app](https://railway.app)
   - Loggen Sie sich mit GitHub ein

2. **Neues Projekt erstellen**
   - Klicken Sie auf "New Project"
   - Wählen Sie "Deploy from GitHub repo"
   - Wählen Sie Ihr YB Store Repository

## Schritt 3: PostgreSQL Database hinzufügen

1. **Database Service hinzufügen**
   - Klicken Sie im Railway Dashboard auf "New Service"
   - Wählen Sie "Database" → "PostgreSQL"
   - Railway erstellt automatisch eine PostgreSQL Instanz

2. **Database URL kopieren**
   - Gehen Sie zu Ihrem PostgreSQL Service
   - Kopieren Sie die `DATABASE_URL` aus den Variables

## Schritt 4: Environment Variables konfigurieren

Fügen Sie folgende Environment Variables in Railway hinzu:

### Notwendige Variables:
```bash
# Database (automatisch von Railway gesetzt)
DATABASE_URL=postgresql://...

# NextAuth
NEXTAUTH_URL=https://ihr-app-name.up.railway.app
NEXTAUTH_SECRET=ihr-super-sicherer-secret-key-hier

# Store Konfiguration
STORE_NAME=YB Store
STORE_CURRENCY=EUR
STORE_TIMEZONE=Europe/Berlin

# Erste Admin Benutzer (optional)
ADMIN_EMAIL=admin@ybstore.com
ADMIN_PASSWORD=ihr-sicheres-passwort
```

### So fügen Sie Variables hinzu:
1. Gehen Sie zu Ihrem Service in Railway
2. Klicken Sie auf "Variables"
3. Fügen Sie jede Variable einzeln hinzu

## Schritt 5: Deployment konfigurieren

1. **Build Command prüfen** (Railway erkennt automatisch)
   ```bash
   npm run build
   ```

2. **Start Command prüfen** (automatisch erkannt)
   ```bash
   npm start
   ```

3. **Port Konfiguration** (automatisch von Railway gesetzt)
   - Railway setzt automatisch den `PORT` Environment Variable

## Schritt 6: Database Migration

1. **Nach dem ersten Deployment**
   - Gehen Sie zu Ihrem Service in Railway
   - Öffnen Sie das Terminal (Connect → Terminal)

2. **Prisma Migration ausführen**
   ```bash
   npx prisma migrate deploy
   npx prisma generate
   ```

3. **Admin Benutzer erstellen** (optional)
   ```bash
   npx prisma db seed
   ```

## Schritt 7: Custom Domain (optional)

1. **Domain hinzufügen**
   - Gehen Sie zu Settings → Networking
   - Fügen Sie Ihre custom domain hinzu
   - Aktualisieren Sie `NEXTAUTH_URL` entsprechend

## Schritt 8: SSL & Security

Railway aktiviert automatisch:
- ✅ HTTPS/SSL Zertifikate
- ✅ CDN für statische Assets
- ✅ Automatische Backups (PostgreSQL)

## Monitoring & Logs

1. **Logs anzeigen**
   - Railway Dashboard → Ihr Service → Logs
   - Real-time log streaming verfügbar

2. **Metrics überwachen**
   - CPU/Memory usage im Dashboard
   - Database Metriken im PostgreSQL Service

## Kosten Übersicht

### Railway Pricing (Stand 2025):
- **Starter Plan**: $5/Monat pro Service
- **PostgreSQL**: $5/Monat
- **Egress**: $0.10 per GB nach dem ersten GB

### Geschätzte monatliche Kosten:
- **Web Service**: $5
- **PostgreSQL**: $5
- **Total**: ~$10-15/Monat (je nach Traffic)

## Backup & Sicherheit

### Automatische Backups:
- PostgreSQL: Tägliche automatische Backups
- Code: Gesichert in GitHub

### Manuelle Backups:
```bash
# Database Export
pg_dump $DATABASE_URL > backup.sql

# Environment Variables Backup
# Speichern Sie Ihre Variables sicher lokal
```

## Troubleshooting

### Häufige Probleme:

1. **Database Connection Fehler**
   ```bash
   # Prüfen Sie die DATABASE_URL
   # Stellen Sie sicher, dass Prisma generate ausgeführt wurde
   ```

2. **Build Fehler**
   ```bash
   # Prüfen Sie die Node.js Version
   # Railway verwendet Node.js 18 standardmäßig
   ```

3. **NextAuth Fehler**
   ```bash
   # Prüfen Sie NEXTAUTH_URL und NEXTAUTH_SECRET
   # URL muss mit https:// beginnen
   ```

## Performance Optimierung

1. **Database Optimierung**
   - Nutzen Sie Prisma Indizes
   - Implementieren Sie Connection Pooling

2. **CDN für Assets**
   - Railway CDN ist automatisch aktiviert
   - Für Bilder: Cloudinary/S3 empfohlen

3. **Caching**
   - Next.js ISR für statische Seiten
   - Redis für Session/Cache (optional)

## Support & Updates

### Automatische Updates:
- Railway deployed automatisch bei Git push
- Zero-downtime deployments

### Manual Updates:
```bash
git push origin main
# Railway erkennt automatisch und deployed
```

## Skalierung

### Traffic Wachstum:
1. **Horizontal Scaling**: Mehrere Web Services
2. **Database Scaling**: PostgreSQL Plan upgrade
3. **CDN**: Für globale Performance

### Empfohlener Upgrade-Pfad:
1. Start: 1 Web + 1 DB Service
2. Wachstum: Load Balancer + 2 Web Services
3. Enterprise: Dedicated Database + Multi-Region

---

## Schnellstart Zusammenfassung

```bash
# 1. Code zu GitHub pushen
git push origin main

# 2. Railway Projekt erstellen und Repository verbinden
# 3. PostgreSQL Service hinzufügen
# 4. Environment Variables setzen
# 5. Automatic deployment abwarten
# 6. Database migration ausführen

npx prisma migrate deploy
```

**Ihr YB Store ist jetzt live! 🚀**

Railway URL: `https://ihr-projekt-name.up.railway.app`

---

## Wichtige Links

- [Railway Documentation](https://docs.railway.app)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
- [Prisma Railway Guide](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-railway)

Bei Fragen oder Problemen können Sie die Railway Community oder die Next.js Discord nutzen.
