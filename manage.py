#!/usr/bin/env python
# pylint: disable=C0111
import os
import sys

# Need to add the main dir... otherwise config won't be found
sys.path.append(os.path.abspath(os.path.dirname(__file__)))
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))


if __name__ == "__main__":
    from config import config_parser
    conf = config_parser.ConfigurationParser() #pylint: disable=C0103
    conf.read_profile()
    settings_module = conf["FT_DJANGO_SETTINGS_MODULE"] #pylint: disable=C0103
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", settings_module)

    from django.core.management import execute_from_command_line

    execute_from_command_line(sys.argv)
