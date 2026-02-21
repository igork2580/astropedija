#!/usr/bin/env bash
# ──────────────────────────────────────────────
# AstroPut API — Test Runner
# ──────────────────────────────────────────────
# Usage:
#   cd apps/api
#   bash run_tests.sh          # run all tests
#   bash run_tests.sh -v       # verbose
#   bash run_tests.sh -k natal # run only tests matching "natal"
#
# Prerequisites:
#   pip install -e ".[dev]"
# ──────────────────────────────────────────────

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR"

# Activate venv if it exists and is not already active
if [ -z "$VIRTUAL_ENV" ] && [ -d "venv" ]; then
    echo "Activating venv..."
    source venv/Scripts/activate 2>/dev/null || source venv/bin/activate
fi

# Check pytest is installed
if ! command -v pytest &>/dev/null; then
    echo "pytest not found. Install dev dependencies:"
    echo "  pip install -e \".[dev]\""
    exit 1
fi

echo "═══════════════════════════════════════════"
echo "  AstroPut API — Running Tests"
echo "═══════════════════════════════════════════"
echo ""

pytest tests/ -v --tb=short "$@"

echo ""
echo "═══════════════════════════════════════════"
echo "  Done!"
echo "═══════════════════════════════════════════"
