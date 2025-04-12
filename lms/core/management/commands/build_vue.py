from django.core.management import BaseCommand
import shutil
from pathlib import Path
import subprocess


class Command(BaseCommand):
    help = "Build Vue Frontend for HR Dashboard"

    def handle(self, *args, **options):
        VUE_PROJECT_DIR = Path("../hr-dashboard")
        DJANGO_STATIC_TARGET = Path("core/static/hr_dashboard")
        VUE_DIST_DIR = VUE_PROJECT_DIR / "dist"

        self.build_vue_app(VUE_PROJECT_DIR)
        self.copy_files(VUE_DIST_DIR, DJANGO_STATIC_TARGET)
        self.stdout.write("😁 All good! HR Dashboard integrated successfully")

    
    def build_vue_app(self, vue_dir:Path):
        self.stdout.write("🛠️ Building vue app")
        result = subprocess.run(["npm", "run", "build"], cwd=vue_dir)
        if result.returncode != 0:
            self.stderr.write("❌ Build failed")
            exit(1)
        self.stdout.write("✅ Build successful")

    def copy_files(self, vue_dist_path:Path, django_target_dir:Path):
        self.stdout.write(f"📁 Copying files to {django_target_dir}")
        if django_target_dir.exists():
            shutil.rmtree(django_target_dir)
        shutil.copytree(vue_dist_path, django_target_dir)
        self.stdout.write("✅ Copying files done")
