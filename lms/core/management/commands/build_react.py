from django.core.management import BaseCommand 
import subprocess
from pathlib import Path
import shutil

class Command(BaseCommand):

    def handle(self, *args, **options):
        help = "Build react Employee dashboard"

        REACT_PROJECT_DIR = Path("../employee-dashboard")
        REACT_DIST_DIR = REACT_PROJECT_DIR / "dist"
        DJANGO_STATIC_DIR = Path("core/static")
        DJANGO_TARGET_DIR = DJANGO_STATIC_DIR / "employee_dashboard"

        self.build_react(REACT_PROJECT_DIR)
        self.copy_files(REACT_DIST_DIR, DJANGO_TARGET_DIR)
        self.stdout.write("😁 All good! Employee dashboard integrated successfully")

        
    def build_react(self, react_dir:Path):
        self.stdout.write("🛠️ Building react app")
        result = subprocess.run(["npm", "run", "build"], cwd=react_dir)
        if result.returncode != 0:
            self.stderr.write("❌ Build failed")
            exit(1)
        self.stdout.write("✅ Build completed successfully")
    
    def copy_files(self, react_dist_dir:Path, django_target_dir:Path):
        self.stdout.write(f"📁 Copying files to {django_target_dir}")
        if django_target_dir.exists():
            shutil.rmtree(django_target_dir)
        shutil.copytree(react_dist_dir, django_target_dir)
        self.stdout.write("✅ Copying files done")
