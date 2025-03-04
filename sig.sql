PGDMP  5    !            	    |            sig    16.3 (Debian 16.3-1.pgdg110+1)    16.2 /    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    19726    sig    DATABASE     n   CREATE DATABASE sig WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';
    DROP DATABASE sig;
                postgres    false                        2615    2200    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
                pg_database_owner    false            �           0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                   pg_database_owner    false    5            �            1259    38336    csb    TABLE     �  CREATE TABLE public.csb (
    id integer NOT NULL,
    nom character varying NOT NULL,
    adresse character varying NOT NULL,
    numero character varying NOT NULL,
    heure character varying NOT NULL,
    service character varying NOT NULL,
    geom public.geometry NOT NULL,
    lien character varying,
    longitude double precision NOT NULL,
    latitude double precision NOT NULL
);
    DROP TABLE public.csb;
       public         heap    postgres    false    5    5    5    5    5    5    5    5    5    5    5    5    5    5    5    5    5            �            1259    38335 
   csb_id_seq    SEQUENCE     �   ALTER TABLE public.csb ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.csb_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    5    224            �            1259    46552    dispensaire    TABLE     �  CREATE TABLE public.dispensaire (
    id integer NOT NULL,
    nom character varying NOT NULL,
    adresse character varying NOT NULL,
    numero character varying NOT NULL,
    heure character varying NOT NULL,
    service character varying NOT NULL,
    geom public.geometry NOT NULL,
    lien character varying,
    longitude double precision NOT NULL,
    latitude double precision NOT NULL
);
    DROP TABLE public.dispensaire;
       public         heap    postgres    false    5    5    5    5    5    5    5    5    5    5    5    5    5    5    5    5    5            �            1259    46551    dispensaire_id_seq    SEQUENCE     �   ALTER TABLE public.dispensaire ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.dispensaire_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    226    5            �            1259    46560    gendarmerie    TABLE     �  CREATE TABLE public.gendarmerie (
    id integer NOT NULL,
    nom character varying NOT NULL,
    adresse character varying NOT NULL,
    numero character varying NOT NULL,
    heure character varying NOT NULL,
    service character varying NOT NULL,
    geom public.geometry NOT NULL,
    lien character varying,
    longitude double precision NOT NULL,
    latitude double precision NOT NULL
);
    DROP TABLE public.gendarmerie;
       public         heap    postgres    false    5    5    5    5    5    5    5    5    5    5    5    5    5    5    5    5    5            �            1259    46559    gendarmerie_id_seq    SEQUENCE     �   ALTER TABLE public.gendarmerie ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.gendarmerie_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    228    5            �            1259    46568    hopital    TABLE     �  CREATE TABLE public.hopital (
    id integer NOT NULL,
    nom character varying NOT NULL,
    adresse character varying NOT NULL,
    numero character varying NOT NULL,
    heure character varying NOT NULL,
    service character varying NOT NULL,
    geom public.geometry NOT NULL,
    lien character varying,
    longitude double precision NOT NULL,
    latitude double precision NOT NULL
);
    DROP TABLE public.hopital;
       public         heap    postgres    false    5    5    5    5    5    5    5    5    5    5    5    5    5    5    5    5    5            �            1259    46567    hopital_id_seq    SEQUENCE     �   ALTER TABLE public.hopital ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.hopital_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    230    5            �            1259    46576    jirama    TABLE     �  CREATE TABLE public.jirama (
    id integer NOT NULL,
    nom character varying NOT NULL,
    adresse character varying NOT NULL,
    numero character varying NOT NULL,
    heure character varying NOT NULL,
    service character varying NOT NULL,
    geom public.geometry NOT NULL,
    lien character varying,
    longitude double precision NOT NULL,
    latitude double precision NOT NULL
);
    DROP TABLE public.jirama;
       public         heap    postgres    false    5    5    5    5    5    5    5    5    5    5    5    5    5    5    5    5    5            �            1259    46575    jirama_id_seq    SEQUENCE     �   ALTER TABLE public.jirama ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.jirama_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    232    5            �            1259    46584 	   pharmacie    TABLE     �  CREATE TABLE public.pharmacie (
    id integer NOT NULL,
    nom character varying NOT NULL,
    adresse character varying NOT NULL,
    numero character varying NOT NULL,
    heure character varying NOT NULL,
    service character varying NOT NULL,
    geom public.geometry NOT NULL,
    lien character varying,
    longitude double precision NOT NULL,
    latitude double precision NOT NULL
);
    DROP TABLE public.pharmacie;
       public         heap    postgres    false    5    5    5    5    5    5    5    5    5    5    5    5    5    5    5    5    5            �            1259    46583    pharmacie_id_seq    SEQUENCE     �   ALTER TABLE public.pharmacie ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.pharmacie_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    5    234            �            1259    46592    police    TABLE     �  CREATE TABLE public.police (
    id integer NOT NULL,
    nom character varying NOT NULL,
    adresse character varying NOT NULL,
    numero character varying NOT NULL,
    heure character varying NOT NULL,
    service character varying NOT NULL,
    geom public.geometry NOT NULL,
    lien character varying,
    longitude double precision NOT NULL,
    latitude double precision NOT NULL
);
    DROP TABLE public.police;
       public         heap    postgres    false    5    5    5    5    5    5    5    5    5    5    5    5    5    5    5    5    5            �            1259    46591    police_id_seq    SEQUENCE     �   ALTER TABLE public.police ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.police_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    5    236            �            1259    21942    utilisateur    TABLE     �   CREATE TABLE public.utilisateur (
    id integer NOT NULL,
    nom character varying NOT NULL,
    prenom character varying NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL
);
    DROP TABLE public.utilisateur;
       public         heap    postgres    false    5            �            1259    21941    utilisateur_id_seq    SEQUENCE     �   ALTER TABLE public.utilisateur ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.utilisateur_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    5    222            �          0    38336    csb 
   TABLE DATA           h   COPY public.csb (id, nom, adresse, numero, heure, service, geom, lien, longitude, latitude) FROM stdin;
    public          postgres    false    224   �;       �          0    46552    dispensaire 
   TABLE DATA           p   COPY public.dispensaire (id, nom, adresse, numero, heure, service, geom, lien, longitude, latitude) FROM stdin;
    public          postgres    false    226   �<       �          0    46560    gendarmerie 
   TABLE DATA           p   COPY public.gendarmerie (id, nom, adresse, numero, heure, service, geom, lien, longitude, latitude) FROM stdin;
    public          postgres    false    228   �<       �          0    46568    hopital 
   TABLE DATA           l   COPY public.hopital (id, nom, adresse, numero, heure, service, geom, lien, longitude, latitude) FROM stdin;
    public          postgres    false    230   �<       �          0    46576    jirama 
   TABLE DATA           k   COPY public.jirama (id, nom, adresse, numero, heure, service, geom, lien, longitude, latitude) FROM stdin;
    public          postgres    false    232   �<       �          0    46584 	   pharmacie 
   TABLE DATA           n   COPY public.pharmacie (id, nom, adresse, numero, heure, service, geom, lien, longitude, latitude) FROM stdin;
    public          postgres    false    234   =       �          0    46592    police 
   TABLE DATA           k   COPY public.police (id, nom, adresse, numero, heure, service, geom, lien, longitude, latitude) FROM stdin;
    public          postgres    false    236   0=       +          0    21166    spatial_ref_sys 
   TABLE DATA           X   COPY public.spatial_ref_sys (srid, auth_name, auth_srid, srtext, proj4text) FROM stdin;
    public          postgres    false    217   M=       �          0    21942    utilisateur 
   TABLE DATA           G   COPY public.utilisateur (id, nom, prenom, email, password) FROM stdin;
    public          postgres    false    222   j=       �           0    0 
   csb_id_seq    SEQUENCE SET     9   SELECT pg_catalog.setval('public.csb_id_seq', 49, true);
          public          postgres    false    223            �           0    0    dispensaire_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.dispensaire_id_seq', 1, false);
          public          postgres    false    225            �           0    0    gendarmerie_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.gendarmerie_id_seq', 1, false);
          public          postgres    false    227            �           0    0    hopital_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.hopital_id_seq', 1, false);
          public          postgres    false    229            �           0    0    jirama_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.jirama_id_seq', 1, false);
          public          postgres    false    231            �           0    0    pharmacie_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.pharmacie_id_seq', 1, false);
          public          postgres    false    233            �           0    0    police_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.police_id_seq', 1, false);
          public          postgres    false    235            �           0    0    utilisateur_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.utilisateur_id_seq', 4, true);
          public          postgres    false    221            2           2606    38342    csb csb_pkey 
   CONSTRAINT     J   ALTER TABLE ONLY public.csb
    ADD CONSTRAINT csb_pkey PRIMARY KEY (id);
 6   ALTER TABLE ONLY public.csb DROP CONSTRAINT csb_pkey;
       public            postgres    false    224            4           2606    46558    dispensaire dispensaire_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.dispensaire
    ADD CONSTRAINT dispensaire_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.dispensaire DROP CONSTRAINT dispensaire_pkey;
       public            postgres    false    226            6           2606    46566    gendarmerie gendarmerie_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.gendarmerie
    ADD CONSTRAINT gendarmerie_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.gendarmerie DROP CONSTRAINT gendarmerie_pkey;
       public            postgres    false    228            8           2606    46574    hopital hopital_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.hopital
    ADD CONSTRAINT hopital_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.hopital DROP CONSTRAINT hopital_pkey;
       public            postgres    false    230            :           2606    46582    jirama jirama_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.jirama
    ADD CONSTRAINT jirama_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.jirama DROP CONSTRAINT jirama_pkey;
       public            postgres    false    232            <           2606    46590    pharmacie pharmacie_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.pharmacie
    ADD CONSTRAINT pharmacie_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.pharmacie DROP CONSTRAINT pharmacie_pkey;
       public            postgres    false    234            >           2606    46598    police police_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.police
    ADD CONSTRAINT police_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.police DROP CONSTRAINT police_pkey;
       public            postgres    false    236            0           2606    21948    utilisateur utilisateur_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.utilisateur
    ADD CONSTRAINT utilisateur_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.utilisateur DROP CONSTRAINT utilisateur_pkey;
       public            postgres    false    222            �   �   x����� @��_f@��Կ�e���	�}�
ے�+)���y�n:���y�&,�0k�*�����AQ�^��O �=�jp��A�"%�����Z6�G�닪x��X��Z���@U��p"6`���0NQ��Z�~�������[2<�إ�ϳ�R��=����^H�sv-c/Qyt      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      +      x������ � �      �   Y   x�3�J��/���,J�̫��H�J��̼D��Y�Cznbf�^r~.g�����q�E�yr��Q��qj��EJ������qR�W� 8!     