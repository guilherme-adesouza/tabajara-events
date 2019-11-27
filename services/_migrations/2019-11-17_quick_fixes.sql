ALTER TABLE activity_event ADD UNIQUE (id_client, id_event);
ALTER TABLE check_in ADD UNIQUE (id_activity_event);