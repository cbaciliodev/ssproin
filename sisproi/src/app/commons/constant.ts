export const fichaHeader = [
    { label: 'Sector', key: 'sector' },
    { label: 'Sub sector', key: 'sector_nivel_2' },
    { label: 'Jurisdicción', key: 'jurisdiccion' },
    { label: 'Nombre del programa', key: 'nombre_programa' },
    { label: 'Descripción de programa', key: 'descripcion_programa' },
    { label: 'Nombre del proyecto', key: 'nombre_proyecto' },
    { label: 'Descripción de proyecto', key: 'descripcion_proyecto' },
    { label: 'Monto estimado', key: 'monto_estimado' },
    { label: 'Prioridad', key: 'prioridad' },
    { label: 'Comentario de prioridad', key: 'comentarios_prioridad_sector' },
    { label: 'Modalidad contractual', key: 'modalidad' },
    { label: 'Nivel de avance', key: 'avance' },
    { label: 'Observaciones del avance', key: 'nivel_avance_observacion' },
    { label: 'Año de inicio de obras', key: 'anio_inicio_posible' },
    { label: 'Año de puesta en operación', key: 'anio_puesta_operacion' },
    { label: 'Departamentos', key: 'departamento' },
    { label: 'Comentarios', key: 'comentarios' }
];

export const evalHeader = fichaHeader.concat(
    [
        { label: 'Prioridad politica', key: 'prio_politica_sect' },
        { label: 'Comentarios', key: 'prio_politica_sect_comentario' },
        { label: 'Diseño Tecnico', key: 'riesgo_dis_tec' },
        { label: 'Comentarios', key: 'riesgo_dis_tec_comentario' },
        { label: 'Demanda considerada', key: 'riesgo_dis_deman' },
        { label: 'Comentarios', key: 'riesgo_dis_deman_comentario' },
        { label: 'Socioambientales', key: 'riesgo_socioamb' },
        { label: 'Comentarios', key: 'riesgo_socioamb_comentario' },
        { label: 'Políticos', key: 'riesgo_politico' },
        { label: 'Comentarios', key: 'riesgo_politico_comentario' },
        { label: 'Institucionales', key: 'riesgo_institucional' },
        { label: 'Comentarios', key: 'riesgo_institucional_comentario' },
        { label: 'Otros', key: 'riesgo_otros' },
        { label: 'Comentarios', key: 'riesgo_otros_comentario' },
        { label: 'Minería', key: 'productiva_mineria' },
        { label: 'Comentarios', key: 'productiva_mineria_comentario' },
        { label: 'Agricultura', key: 'productiva_agri' },
        { label: 'Comentarios', key: 'productiva_agri_comentario' },
        { label: 'Pesca', key: 'productiva_pesca' },
        { label: 'Comentarios', key: 'productiva_pesca_comentario' },
        { label: 'Industria', key: 'productiva_indus' },
        { label: 'Comentarios', key: 'productiva_indus_comentario' },
        { label: 'Otros', key: 'productiva_otros' },
        { label: 'Comentarios', key: 'productiva_otros_comentario' },
        { label: 'Transporte', key: 'social_trans' },
        { label: 'Comentarios', key: 'social_trans_comentario' },
        { label: 'Telecomunicación', key: 'social_telco' },
        { label: 'Comentarios', key: 'social_telco_comentario' },
        { label: 'Agua y Saneamiento', key: 'social_agua' },
        { label: 'Comentarios', key: 'social_agua_comentario' },
        { label: 'Riego', key: 'social_riego' },
        { label: 'Comentarios', key: 'social_riego_comentario' },
        { label: 'Educación', key: 'social_educa' },
        { label: 'Comentarios', key: 'social_educa_comentario' },
        { label: 'Salud', key: 'social_salud' },
        { label: 'Comentarios', key: 'social_salud_comentario' },
        { label: 'Síntesis de evaluación', key: 'sintesis_evaluacion' },
    ]
);